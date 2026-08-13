const vectorSearchService = require("../services/vectorSearchService");

async function execute(intent, query, options) {

    switch (intent) {

        case "ram":
        case "camera":
        case "battery":
        case "price":
        case "storage":

            return vectorSearchService.search(
                query,
                options
            );

        default:

            return vectorSearchService.search(
                query,
                options
            );

    }

}

module.exports = {
    execute
};