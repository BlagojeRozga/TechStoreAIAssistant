const answerService =
    require("../../../services/answerService");

class AnswerStage {

    async execute(context) {

        if (context.response) {
            return context;
        }

        if (!context.results || context.results.length === 0) {
            return context;
        }

        const answer =
            await answerService.generateAnswer(
                context.message,
                context.results
            );

        context.generatedAnswer = answer;

        return context;
    }
}

module.exports = AnswerStage;