require("dotenv").config();

const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function test() {
    try {
        const response = await client.embeddings.create({
            model: "text-embedding-3-small",
            input: "Koliko RAM memorije ima iPhone 16?"
        });

        const embedding = response.data[0].embedding;

        console.log("OpenAI API radi!");
        console.log("Broj dimenzija:", embedding.length);
        console.log("Prvih 5 vrednosti:", embedding.slice(0, 5));

    } catch (error) {
        console.error("Greška:", error.message);
    }
}

test();