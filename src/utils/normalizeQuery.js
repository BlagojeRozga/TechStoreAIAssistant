function normalizeQuery(query) {

    if (!query) {
        return "";
    }

    return query
        .toLowerCase()

        // Najčešće varijante za brendove
        .replace(/\bajfon\b/g, "iphone")
        .replace(/\bajfona\b/g, "iphone")

        .replace(/\bsamsunga\b/g, "samsung")
        .replace(/\bsamsungov\b/g, "samsung")

        // RAM
        .replace(/\brama\b/g, "ram")
        .replace(/\bram-a\b/g, "ram")
        .replace(/\bram memorije\b/g, "ram")

        // GB
        .replace(/\bgigabajta\b/g, "gb")

        // Višestruki razmaci
        .replace(/\s+/g, " ")

        .trim();
}

module.exports = normalizeQuery;