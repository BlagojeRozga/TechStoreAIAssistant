const normalizeQuery = require("../../../utils/normalizeQuery");

class NormalizeStage {

    async execute(context) {

        context.normalizedQuery = normalizeQuery(
            context.message
        );

        return context;
    }

}

module.exports = NormalizeStage;