const detectCategory = require("../../../utils/detectCategory");

class CategoryStage {

    async execute(context) {

        context.category = detectCategory(
            context.normalizedQuery
        );

        return context;
    }

}

module.exports = CategoryStage;