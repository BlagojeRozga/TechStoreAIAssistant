const normalizeQuery = require("../utils/normalizeQuery");
const detectIntent = require("../utils/detectIntent");
const detectCategory = require("../utils/detectCategory");
const detectProduct = require("../utils/detectProduct");
const conversationMemory = require("../services/conversationMemory");
const vectorSearchService = require("../services/vectorSearchService");

async function process(message, sessionId) {

    const normalizedQuery = normalizeQuery(message);

    let product = detectProduct(normalizedQuery);

    if (!product.model) {

        const remembered =
            conversationMemory.getProduct(sessionId);

        if (remembered) {

            product = remembered;

        }

    }

    if (product.model) {

        conversationMemory.setProduct(
            sessionId,
            product
        );

    }

    const intent = detectIntent(normalizedQuery);

    const category = detectCategory(normalizedQuery);

    let searchQuery = normalizedQuery;

    if (product.model) {

        searchQuery =
            `${product.brand} ${product.model} ${normalizedQuery}`;

    }

    const results =
        await vectorSearchService.search(
            searchQuery,
            {
                brand: product.brand,
                model: product.model,
                category
            }
        );

    return {
        intent,
        category,
        product,
        results
    };

}

module.exports = {
    process
};