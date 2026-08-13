const fs = require("fs");

const products = require("../knowledge/products.json");

const knowledge = [];

let chunkId = 1;

function add(question, answer, product, category) {
    knowledge.push({
        documentId: `${product.brand}_${product.model}_${chunkId}`,
        chunkId: chunkId++,
        pageContent: question,
        metadata: {
            answer,
            brand: product.brand,
            model: product.model,
            category
        }
    });
}

for (const p of products) {

    add(
        `Koliko RAM memorije ima ${p.model}?`,
        `${p.model} ima ${p.ram} GB RAM memorije.`,
        p,
        "ram"
    );

    add(
        `Koji procesor koristi ${p.model}?`,
        `${p.model} koristi ${p.cpu} procesor.`,
        p,
        "cpu"
    );

    add(
        `Koliki ekran ima ${p.model}?`,
        `${p.model} ima ekran veličine ${p.display}.`,
        p,
        "display"
    );

    add(
        `Kolika je baterija modela ${p.model}?`,
        `${p.model} ima bateriju od ${p.battery} mAh.`,
        p,
        "battery"
    );

    add(
        `Koliko košta ${p.model}?`,
        `Cena modela ${p.model} je oko ${p.price} €.`,
        p,
        "price"
    );

    add(
        `Koliko megapiksela ima kamera na telefonu ${p.model}?`,
        `${p.model} ima glavnu kameru od ${p.camera} MP.`,
        p,
        "camera"
    );
}

fs.writeFileSync(
    "./generated/knowledge.json",
    JSON.stringify(knowledge, null, 2)
);

console.log(`Generisano ${knowledge.length} dokumenata.`);