import { GoogleGenerativeAI } from "@google/generative-ai";

export async function gem(req, res) {
    try {
        const { prompt } = req.body;
        console.log("Request body:", req.body);

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        // Correct initialization of GoogleGenerativeAI
        const genAI = new GoogleGenerativeAI("AIzaSyCZJMcRXVeQYbVTfCURLLJeMh__m0kRY90");

        // Use the correct method to generate content
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

       // console.log("Generated text:", text);
        res.json({ text });
    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ error: error.message });
    }
}


export default gem;