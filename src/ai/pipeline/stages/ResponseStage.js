class ResponseStage {

    async execute(context) {

        if (context.response) {
            return context;
        }

        const best = context.results?.[0];

        if (!best) {
            return context;
        }

        context.response = {
            answer:
                context.generatedAnswer ||
                best.answer,

            confidence: best.similarity,

            product: context.product,

            category: context.category,

            intent: context.intent,

            sources: context.results
        };

        return context;
    }

}

module.exports = ResponseStage;