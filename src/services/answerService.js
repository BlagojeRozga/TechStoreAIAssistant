const OpenAI = require("openai");

async function generateAnswer(question, results) {

    if (!results || !results.length) {
        return "Nažalost, nisam pronašao odgovor u bazi znanja.";
    }

    // Najbolji odgovor iz baze
    const fallbackAnswer = results[0].answer;

    // Ako nema API ključa, ne pokušavamo OpenAI
    if (!process.env.OPENAI_API_KEY) {

        console.log("⚠️ OPENAI_API_KEY nije podešen.");
        console.log("↩️ Koristim odgovor iz baze znanja.");

        return fallbackAnswer;
    }

    try {

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        const context = results
            .slice(0, 3)
            .map(result => result.answer)
            .join("\n");

        const response =
            await client.chat.completions.create({

                model: "gpt-4o-mini",

                messages: [

                    {
                        role: "system",

                        content: `
Ti si AI asistent TechStore prodavnice.

Odgovaraj ISKLJUČIVO na osnovu informacija iz prosleđenog konteksta.

Ne izmišljaj informacije.

Ako odgovor nije sadržan u kontekstu, reci:
"Nažalost, nemam dovoljno informacija da odgovorim na to pitanje."

Odgovaraj kratko i jasno na srpskom jeziku.
`
                    },

                    {
                        role: "user",

                        content: `
Pitanje korisnika:
${question}

Kontekst iz baze znanja:
${context}
`
                    }

                ]

            });

        return response.choices[0].message.content;

    } catch (error) {

        console.error("⚠️ OpenAI nije dostupan:");
        console.error(error.message);

        console.log("↩️ Koristim odgovor iz baze znanja.");

        return fallbackAnswer;
    }
}

module.exports = {
    generateAnswer
};