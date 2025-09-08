import type { NextApiRequest, NextApiResponse } from "next";
import { FAISS } from "@langchain/vectorstores/faiss";
import { OpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "@langchain/openai";

const SYSTEM_PROMPT = `You are a Data-Governance Assistant. Answer the question using ONLY the provided excerpts. If the question is unrelated to data-governance or outside the scope of the provided policy, reply with: "I can only answer questions that are directly related to the uploaded data-governance policy."

Policy excerpts:
{context}

Question:
{question}

Provide a concise answer (max 3 sentences) and cite the relevant sections.`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Missing question" });
    }

    // Initialize embeddings with OpenRouter
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENROUTER_API_KEY,
      modelName: "text-embedding-3-large",
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
    });

    // Load the vector store
    const vectorStore = await FAISS.load("./policy_index", embeddings);

    // Initialize the LLM with OpenRouter
    const llm = new OpenAI({
      openAIApiKey: process.env.OPENROUTER_API_KEY,
      modelName: "deepseek/deepseek-chat-v3.1:free",
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
      temperature: 0.2,
      maxTokens: 300,
    });

    // Create and run the QA chain
    const chain = RetrievalQAChain.fromLLM(llm, vectorStore.asRetriever(4), {
      prompt: SYSTEM_PROMPT,
    });

    const result = await chain.call({ query: question });
    res.status(200).json({ answer: result.text });
  } catch (error) {
    console.error("Error processing question:", error);
    res.status(500).json({ error: "Failed to process question" });
  }
}
