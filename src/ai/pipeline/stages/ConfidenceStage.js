class ConfidenceStage {

    async execute(context) {

        const best = context.results?.[0];

        // Nema rezultata
        if (!best) {

            context.response = {
                answer: "Nažalost, nemam dovoljno informacija da odgovorim na to pitanje.",
                confidence: 0,
                sources: []
            };

            context.stopPipeline = true;

            return context;
        }

        // Rezultat nije dovoljno pouzdan
        if (best.similarity < 0.75) {

            context.response = {
                answer: "Nažalost, nemam dovoljno informacija da odgovorim na to pitanje.",
                confidence: best.similarity,
                sources: []
            };

            context.stopPipeline = true;

            return context;
        }

        return context;
    }
}

module.exports = ConfidenceStage;