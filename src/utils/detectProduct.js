function detectProduct(query) {
    const text = String(query || "").toLowerCase();

    let brand = null;
    let model = null;

    // Apple
    const iphoneMatch = text.match(
        /(?:iphone|ajfon)\s*(\d+(?:\s*(?:pro|max|plus|promax))?)/i
    );

    if (iphoneMatch) {
        brand = "Apple";
        model = `iPhone ${iphoneMatch[1]}`;
    }

    // Samsung
    if (!brand && text.includes("samsung")) {
        const samsungMatch = text.match(
            /samsung\s*(?:galaxy\s*)?([a-z]\d+(?:\s*(?:ultra|plus|pro))?)/i
        );

        if (samsungMatch) {
            brand = "Samsung";
            model = `Samsung ${samsungMatch[1]}`;
        }
    }

    // Google Pixel
    if (!brand) {
        const pixelMatch = text.match(
            /(?:google\s*)?pixel\s*(\d+(?:\s*(?:pro|xl))?)/i
        );

        if (pixelMatch) {
            brand = "Google";
            model = `Pixel ${pixelMatch[1]}`;
        }
    }

    // Xiaomi
    if (!brand && text.includes("xiaomi")) {
        const xiaomiMatch = text.match(
            /xiaomi\s*(\d+(?:\s*(?:pro|ultra|plus))?)/i
        );

        if (xiaomiMatch) {
            brand = "Xiaomi";
            model = `Xiaomi ${xiaomiMatch[1]}`;
        }
    }

    // Nothing Phone
    if (!brand) {
        const nothingMatch = text.match(
            /nothing\s*(?:phone\s*)?(\d+(?:\s*(?:pro|plus))?)/i
        );

        if (nothingMatch) {
            brand = "Nothing";
            model = `Phone ${nothingMatch[1]}`;
        }
    }

    return {
        brand,
        model
    };
}

module.exports = detectProduct;