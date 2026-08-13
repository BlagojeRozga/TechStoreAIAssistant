const vectorSearchService =
    require("../../../services/vectorSearchService");

class SearchStage {

    async execute(context) {

        context.results =
            await vectorSearchService.search(
                context.searchQuery,
                {
                    brand: context.product.brand,
                    model: context.product.model,
                    category: context.category
                }
            );

        return context;
    }

}

module.exports = SearchStage;