class QueryRewriteStage {

    async execute(context) {

        let query = context.normalizedQuery;

        const product = context.product;

        if (
            product &&
            product.brand &&
            product.model
        ) {

            const hasProductInQuery =
                query.includes(product.brand.toLowerCase()) ||
                query.includes(product.model.toLowerCase());

            if (!hasProductInQuery) {

                query = `${query} ${product.brand} ${product.model}`;

            }
        }

        context.searchQuery = query;

        console.log(
            "Query za pretragu:",
            context.searchQuery
        );

        return context;
    }

}

module.exports = QueryRewriteStage;