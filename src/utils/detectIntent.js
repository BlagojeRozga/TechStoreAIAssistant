function detectIntent(query) {

    const text = query.toLowerCase();

    // Poređenje
    if (
        text.includes("uporedi") ||
        text.includes("poređenje") ||
        text.includes("poredjenje") ||
        text.includes("bolji") ||
        text.includes("bolje") ||
        text.includes("razlika između") ||
        text.includes("razlika izmedju")
    ) {
        return "comparison";
    }

    // RAM
    if (
        text.includes("ram") ||
        text.includes("memorije") ||
        text.includes("gigabajta")
    ) {
        return "ram";
    }

    // Kamera
    if (
        text.includes("kamera") ||
        text.includes("megapiksel") ||
        /\bmp\b/.test(text)
    ) {
        return "camera";
    }

    // Baterija
    if (
        text.includes("baterija") ||
        text.includes("mah") ||
        text.includes("autonomija")
    ) {
        return "battery";
    }

    // Cena
    if (
        text.includes("cena") ||
        text.includes("košta") ||
        text.includes("kosta") ||
        text.includes("koliko para") ||
        text.includes("košt") ||
        text.includes("kost")
    ) {
        return "price";
    }

    return "general";
}

module.exports = detectIntent;