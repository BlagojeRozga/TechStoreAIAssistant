class RerankStage {

    async execute(context) {

        if (!context.results?.length) {
            return context;
        }

        const results = context.results.map(result => {

            let score = result.similarity;

            // Kategorija
            if (
                context.category &&
                result.category &&
                result.category.toLowerCase() ===
                context.category.toLowerCase()
            ) {
                score += 0.10;
            }

            // Brend
            if (
                context.product?.brand &&
                result.brand &&
                result.brand.toLowerCase() ===
                context.product.brand.toLowerCase()
            ) {
                score += 0.05;
            }

            // Model
            if (
                context.product?.model &&
                result.model &&
                result.model.toLowerCase() ===
                context.product.model.toLowerCase()
            ) {
                score += 0.10;
            }

            return {
                ...result,
                rerankScore: score
            };
        });

        results.sort(
            (a, b) =>
                b.rerankScore - a.rerankScore
        );

        context.results = results;

        console.log(
            "Reranked results:",
            results.map(r => ({
                similarity: r.similarity,
                rerankScore: r.rerankScore,
                category: r.category,
                brand: r.brand,
                model: r.model
            }))
        );

        return context;
    }

}

module.exports = RerankStage;