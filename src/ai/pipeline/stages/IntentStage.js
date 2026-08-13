const detectIntent = require("../../../utils/detectIntent");

class IntentStage {

    async execute(context) {

        context.intent = detectIntent(
            context.normalizedQuery
        );

        return context;

    }

}

module.exports = IntentStage;