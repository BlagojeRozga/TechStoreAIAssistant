const fs = require("fs");
const path = require("path");

const {
    pipeline
} = require("@xenova/transformers");

const INPUT_FILE = path.join(
    __dirname,
    "../generated/knowledge_variations.json"
);

const OUTPUT_FILE = path.join(
    __dirname,
    "../generated/vectorStore.json"
);

async function main() {

    console.log("Ucitavam knowledge bazu...");

    const documents = JSON.parse(
        fs.readFileSync(INPUT_FILE, "utf8")
    );

    console.log(`Pronadjeno dokumenata: ${documents.length}`);

    console.log("Ucitavam lokalni embedding model...");

    const extractor = await pipeline(
        "feature-extraction",
        "Xenova/paraphrase-multilingual-MiniLM-L12-v2"
    );

    console.log("Model ucitan.");

    const vectorStore = [];

    for (let i = 0; i < documents.length; i++) {

        const document = documents[i];

        console.log(
            `Embedding ${i + 1}/${documents.length}: ${document.pageContent}`
        );

        const output = await extractor(
            document.pageContent,
            {
                pooling: "mean",
                normalize: true
            }
        );

        const embedding = Array.from(output.data);

        vectorStore.push({
            pageContent: document.pageContent,
            metadata: document.metadata,
            embedding
        });
    }

    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(vectorStore)
    );

    console.log("");
    console.log("=================================");
    console.log("VECTOR STORE USPESNO NAPRAVLJEN");
    console.log("=================================");
    console.log(`Dokumenata: ${vectorStore.length}`);
    console.log(`Sacuvano u: ${OUTPUT_FILE}`);
}

main().catch(error => {

    console.error("");
    console.error("GRESKA:");
    console.error(error);

    process.exit(1);
});