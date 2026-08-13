const fs = require("fs");

const input = require("../generated/knowledge.json");

const output = [];

let chunkId = 1;

const variations = {
    ram: [
        "Koliko RAM memorije ima {model}?",
        "Koliko RAM-a ima {model}?",
        "Koliko gigabajta RAM-a ima {model}?",
        "Koliki RAM ima {model}?",
        "Koliko memorije ima {model}?",
        "Koliko je RAM na modelu {model}?",
        "{model} RAM?",
        "RAM memorija {model}?"
    ],

    cpu: [
        "Koji procesor koristi {model}?",
        "Koji procesor ima {model}?",
        "Koji CPU ima {model}?",
        "Koji čip koristi {model}?",
        "Procesor na modelu {model}?",
        "Koji je procesor telefona {model}?"
    ],

    display: [
        "Koliki ekran ima {model}?",
        "Koju veličinu ekrana ima {model}?",
        "Koliki je ekran na modelu {model}?",
        "Kakav ekran ima {model}?",
        "Koja je veličina ekrana kod {model}?",
        "Ekran {model}?"
    ],

    battery: [
        "Kolika je baterija modela {model}?",
        "Koliki kapacitet baterije ima {model}?",
        "Koliko mAh ima {model}?",
        "Kakvu bateriju ima {model}?",
        "Koliko traje baterija na {model}?",
        "Baterija {model}?"
    ],

    price: [
        "Koliko košta {model}?",
        "Koja je cena modela {model}?",
        "Kolika je cena telefona {model}?",
        "Koliko para košta {model}?",
        "Cena za {model}?",
        "Koliko treba izdvojiti za {model}?"
    ],

    camera: [
        "Koliko megapiksela ima kamera na telefonu {model}?",
        "Koliko MP ima {model}?",
        "Kakvu kameru ima {model}?",
        "Kolika je kamera na modelu {model}?",
        "Koliko megapiksela ima {model}?",
        "Kamera na {model}?"
    ]
};

for (const item of input) {

    const product = item.metadata;
    const templates = variations[product.category];

    if (!templates) {
        continue;
    }

    for (const template of templates) {

        const question = template.replace(
            "{model}",
            product.model
        );

        output.push({
            documentId: `${product.brand}_${product.model}_${chunkId}`,
            chunkId: chunkId++,
            pageContent: question,
            metadata: {
                answer: product.answer,
                brand: product.brand,
                model: product.model,
                category: product.category
            }
        });
    }
}

fs.writeFileSync(
    "./generated/knowledge_variations.json",
    JSON.stringify(output, null, 2)
);

console.log(`Generisano ${output.length} varijacija.`);