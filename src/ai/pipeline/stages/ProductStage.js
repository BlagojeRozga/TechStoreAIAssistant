const detectProduct = require("../../../utils/detectProduct");

class ProductStage {

    async execute(context) {

        context.product = detectProduct(
            context.normalizedQuery
        );

        return context;
    }

}

module.exports = ProductStage;