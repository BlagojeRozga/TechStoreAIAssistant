const fs = require("fs");
const path = require("path");

const {
    pipeline
} = require("@xenova/transformers");

const VECTOR_STORE_FILE = path.join(
    __dirname,
    "../generated/vectorStore.json"
);

function cosineSimilarity(a, b) {

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {

        dotProduct += a[i] * b[i];

        magnitudeA += a[i] * a[i];
        magnitudeB += b[i] * b[i];
    }

    if (magnitudeA === 0 || magnitudeB === 0) {
        return 0;
    }

    return dotProduct /
        (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

async function search(query, topK = 5) {

    console.log(`\nUpit: "${query}"\n`);

    const vectorStore = JSON.parse(
        fs.readFileSync(
            VECTOR_STORE_FILE,
            "utf8"
        )
    );

    const extractor = await pipeline(
        "feature-extraction",
        "Xenova/paraphrase-multilingual-MiniLM-L12-v2"
    );

    const output = await extractor(
        query,
        {
            pooling: "mean",
            normalize: true
        }
    );

    const queryEmbedding = Array.from(output.data);

    const results = vectorStore.map(document => {

        const similarity = cosineSimilarity(
            queryEmbedding,
            document.embedding
        );

        return {
            pageContent: document.pageContent,
            answer: document.metadata.answer,
            brand: document.metadata.brand,
            model: document.metadata.model,
            category: document.metadata.category,
            similarity
        };
    });

    results.sort(
        (a, b) => b.similarity - a.similarity
    );

    console.log(`Top ${topK} rezultata:\n`);

    results
        .slice(0, topK)
        .forEach((result, index) => {

            console.log(
                `${index + 1}. ${result.pageContent}`
            );

            console.log(
                `   Slicnost: ${result.similarity.toFixed(4)}`
            );

            console.log(
                `   Odgovor: ${result.answer}`
            );

            console.log("");
        });
}

const query = process.argv
    .slice(2)
    .join(" ");

if (!query) {

    console.log(
        'Primer: node scripts/searchVectorStore.js "koliko rama ima ajfon 16"'
    );

    process.exit(1);
}

search(query).catch(error => {

    console.error("GRESKA:");
    console.error(error);

    process.exit(1);
});