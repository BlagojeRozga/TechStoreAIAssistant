function detectProduct(query) {

    const text = query.toLowerCase();

    let brand = null;
    let model = null;

    // Apple
    if (
        text.includes("iphone") ||
        text.includes("ajfon")
    ) {
        brand = "Apple";

        const iphoneMatch = text.match(
            /(?:iphone|ajfon)\s*(\d+(?:\s*(?:pro|max|plus|promax))?)/i
        );

        if (iphoneMatch) {
            model = `iPhone ${iphoneMatch[1]}`;
        }
    }

    // Samsung
    if (
        text.includes("samsung")
    ) {
        brand = "Samsung";

        const samsungMatch = text.match(
            /samsung\s*(galaxy\s*)?([a-z]\d+(?:\s*(?:ultra|plus|pro))?)/i
        );

        if (samsungMatch) {
            model = `Samsung ${samsungMatch[2]}`;
        }
    }

    return {
        brand,
        model
    };
}

module.exports = detectProduct;