import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import { PDFParser } from "pdf2json";
import { Document } from "docx";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { FAISS } from "@langchain/vectorstores/faiss";

export const config = { api: { bodyParser: false } };

async function extractText(filePath: string, mime: string): Promise<string> {
  if (mime === "application/pdf") {
    const data = fs.readFileSync(filePath);
    const parser = new PDFParser();
    return new Promise((resolve, reject) => {
      parser.on("pdfParser_dataReady", (pdfData) => {
        const text = pdfData.Pages.map(page => 
          page.Texts.map(text => decodeURIComponent(text.R[0].T)).join(" ")
        ).join("\n");
        resolve(text);
      });
      parser.on("pdfParser_dataError", reject);
      parser.parseBuffer(data);
    });
  }
  if (mime === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const buffer = fs.readFileSync(filePath);
    const doc = new Document(buffer);
    return doc.toString();
  }
  return fs.readFileSync(filePath, "utf-8");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const policyFile = files.policy as formidable.File;
    const rawText = await extractText(policyFile.filepath, policyFile.mimetype || "");

    // Split into manageable chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
    });
    const docs = await splitter.createDocuments([rawText]);

    // Create embeddings using OpenRouter's embedding model
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENROUTER_API_KEY,
      modelName: "text-embedding-3-large",
      configuration: {
        baseURL: "https://openrouter.ai/api/v1",
      },
    });

    // Store in FAISS
    const vectorStore = await FAISS.fromDocuments(docs, embeddings);
    
    // Save to a temporary file - in production, use a proper persistent store
    const storePath = "./policy_index";
    await vectorStore.save(storePath);

    res.status(200).json({ message: "Policy indexed successfully" });
  } catch (error) {
    console.error("Error processing policy:", error);
    res.status(500).json({ error: "Failed to process policy" });
  }
}
