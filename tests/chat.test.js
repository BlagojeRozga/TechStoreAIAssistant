const AIEngine = require("../src/ai/AIEngine");

async function runTest(name, fn) {

    try {

        await fn();

        console.log(`✅ PASS: ${name}`);

    } catch (error) {

        console.error(`❌ FAIL: ${name}`);
        console.error(error.message);

    }
}


async function main() {

    // TEST 1 — poznato pitanje
    await runTest(
        "iPhone 16 RAM",
        async () => {

            const response = await AIEngine.ask(
                "koliko RAM-a ima iPhone 16?",
                "test-ram"
            );

            if (
                !response.answer ||
                !response.answer.toLowerCase().includes("8 gb")
            ) {
                throw new Error(
                    `Neočekivan odgovor: ${response.answer}`
                );
            }
        }
    );


    // TEST 2 — kamera
    await runTest(
        "iPhone 16 kamera",
        async () => {

            const response = await AIEngine.ask(
                "kakvu kameru ima iPhone 16?",
                "test-camera"
            );

            if (
                !response.answer ||
                !response.answer.includes("48 MP")
            ) {
                throw new Error(
                    `Neočekivan odgovor: ${response.answer}`
                );
            }
        }
    );


    // TEST 3 — follow-up
    await runTest(
        "Follow-up pitanje",
        async () => {

            await AIEngine.ask(
                "koliko RAM-a ima iPhone 16?",
                "test-followup"
            );

            const response = await AIEngine.ask(
                "a kamera?",
                "test-followup"
            );

            if (
                !response.answer ||
                !response.answer.includes("48 MP")
            ) {
                throw new Error(
                    `Memory nije pravilno radila: ${response.answer}`
                );
            }
        }
    );


    // TEST 4 — nepoznato pitanje
    await runTest(
        "Nepoznato pitanje",
        async () => {

            const response = await AIEngine.ask(
                "kakvo je vreme danas na Marsu?",
                "test-unknown"
            );

            if (
                !response.answer ||
                !response.answer.includes(
                    "nemam dovoljno informacija"
                )
            ) {
                throw new Error(
                    `Confidence zaštita nije radila: ${response.answer}`
                );
            }
        }
    );


    // TEST 5 — potpuno besmislen query
    await runTest(
        "Besmislen query",
        async () => {

            const response = await AIEngine.ask(
                "asdfghjkl qwerty 123456789",
                "test-gibberish"
            );

            if (
                !response.answer ||
                !response.answer.includes(
                    "nemam dovoljno informacija"
                )
            ) {
                throw new Error(
                    `Neočekivan odgovor: ${response.answer}`
                );
            }
        }
    );


    console.log("\n🏁 Svi testovi završeni.");
}


main();