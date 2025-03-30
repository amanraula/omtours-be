import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
const router=express.Router();
const genAI = new GoogleGenerativeAI("AIzaSyAmAm3yLUEsKTBwLdY3xOcSeQFXrU8cs6A");

let responses = "";

//all routes
export async function gem(req, res) {
    try {
        responses = "";
        const { prompt } = req.body;
        console.log("Request body:", req.body);

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        responses = text;

    console.log("Generated text:", text);
        res.json({ text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: error.message });
    }
}

export function getResponses(req,res){
    return res.json(responses);
}

router.post("/generate",gem);
router.get("/responses",getResponses);


export default router;