const detectProduct = require("../../../utils/detectProduct");

class ProductStage {
    async execute(context) {
        const detectedProduct = detectProduct(
            context.normalizedQuery
        );

        if (
            detectedProduct &&
            detectedProduct.brand &&
            detectedProduct.model
        ) {
            context.product = detectedProduct;
        } else if (!context.product) {
            context.product = {
                brand: null,
                model: null
            };
        }

        return context;
    }
}

module.exports = ProductStage;
