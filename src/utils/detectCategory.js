function detectCategory(query) {

    const text = query.toLowerCase();

    if (
        text.includes("ram") ||
        text.includes("memorij")
    ) {
        return "ram";
    }

    if (
        text.includes("kamer") ||
        text.includes("megapiksel") ||
        text.includes("mp")
    ) {
        return "camera";
    }

    if (
        text.includes("cena") ||
        text.includes("košta") ||
        text.includes("kosta") ||
        text.includes("para")
    ) {
        return "price";
    }

    if (
        text.includes("baterij") ||
        text.includes("mah")
    ) {
        return "battery";
    }

    return null;
}

module.exports = detectCategory;