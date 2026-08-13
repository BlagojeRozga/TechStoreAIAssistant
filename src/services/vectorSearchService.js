const cosineSimilarity = require("../utils/cosineSimilarity");
const { getEmbedding } = require("./embeddingService");
const knowledgeRepository = require("../repository/knowledgeRepository");

async function search(query, options = {}) {

    const {
        topK = 5,
        category = null,
        model = null,
        brand = null
    } = options;

    const vectorStore = knowledgeRepository.getVectorStore();

    const queryEmbedding = await getEmbedding(query);

    let documents = vectorStore;

    // Filter po kategoriji
    if (category) {
        documents = documents.filter(document =>
            document.metadata?.category?.toLowerCase() ===
            category.toLowerCase()
        );
    }

    // Filter po modelu
    if (model) {
        documents = documents.filter(document =>
            document.metadata?.model?.toLowerCase() ===
            model.toLowerCase()
        );
    }

    // Filter po brendu
    if (brand) {
        documents = documents.filter(document =>
            document.metadata?.brand?.toLowerCase() ===
            brand.toLowerCase()
        );
    }

    const results = documents.map(document => {

        const similarity = cosineSimilarity(
            queryEmbedding,
            document.embedding
        );

        return {
            pageContent: document.pageContent,
            answer: document.metadata.answer,
            brand: document.metadata.brand,
            model: document.metadata.model,
            category: document.metadata.category,
            similarity
        };

    });

    results.sort(
        (a, b) => b.similarity - a.similarity
    );

    return results.slice(0, topK);
}

module.exports = {
    search
};