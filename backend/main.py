from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import os
import json
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
from langchain.document_loaders import PyPDFLoader, Docx2txtLoader, TextLoader
import shutil

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models
class QuestionRequest(BaseModel):
    question: str
    context: Optional[dict] = None

class AgentResponse(BaseModel):
    answer: str
    sources: Optional[List[str]] = None
    context: Optional[dict] = None

# Initialize OpenAI embeddings with OpenRouter API
embeddings = OpenAIEmbeddings(
    openai_api_key=os.getenv("OPENROUTER_API_KEY"),
    model="text-embedding-3-large",
    base_url="https://openrouter.ai/api/v1"
)

# Vector store path
VECTOR_STORE_PATH = "policy_index"

@app.post("/api/upload")
async def upload_policy(file: UploadFile = File(...)):
    try:
        # Create temp directory if it doesn't exist
        if not os.path.exists("temp"):
            os.makedirs("temp")
        
        file_path = f"temp/{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Load document based on file type
        if file.filename.endswith(".pdf"):
            loader = PyPDFLoader(file_path)
        elif file.filename.endswith(".docx"):
            loader = Docx2txtLoader(file_path)
        elif file.filename.endswith(".txt"):
            loader = TextLoader(file_path)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")
        
        documents = loader.load()
        
        # Split text into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50,
            separators=["\n\n", "\n", " ", ""]
        )
        texts = text_splitter.split_documents(documents)
        
        # Create and save vector store
        vector_store = FAISS.from_documents(texts, embeddings)
        vector_store.save_local(VECTOR_STORE_PATH)
        
        # Cleanup
        os.remove(file_path)
        
        return {"message": "Policy document processed successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ask")
async def ask_question(request: QuestionRequest):
    try:
        # Load vector store
        if not os.path.exists(VECTOR_STORE_PATH):
            raise HTTPException(
                status_code=400, 
                detail="No policy documents have been uploaded yet"
            )
        
        vector_store = FAISS.load_local(VECTOR_STORE_PATH, embeddings)
        
        # Initialize LLM with OpenRouter
        llm = ChatOpenAI(
            openai_api_key=os.getenv("OPENROUTER_API_KEY"),
            model="deepseek/deepseek-chat-v3.1:free",
            temperature=0.2,
            max_tokens=300,
            base_url="https://openrouter.ai/api/v1"
        )
        
        # Create QA chain
        qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=vector_store.as_retriever(search_kwargs={"k": 4}),
            return_source_documents=True
        )
        
        # Get response
        response = qa_chain({"query": request.question})
        
        return AgentResponse(
            answer=response["result"],
            sources=[doc.page_content[:200] + "..." for doc in response["source_documents"]],
            context=request.context
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
