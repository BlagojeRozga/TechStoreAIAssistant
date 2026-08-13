const Pipeline = require("./pipeline/Pipeline");

const NormalizeStage =
    require("./pipeline/stages/NormalizeStage");

const IntentStage =
    require("./pipeline/stages/IntentStage");

const ProductStage =
    require("./pipeline/stages/ProductStage");

const MemoryStage =
    require("./pipeline/stages/MemoryStage");

const QueryRewriteStage =
    require("./pipeline/stages/QueryRewriteStage");

const CategoryStage =
    require("./pipeline/stages/CategoryStage");

const SearchStage =
    require("./pipeline/stages/SearchStage");

const RerankStage =
    require("./pipeline/stages/RerankStage");

const ConfidenceStage =
    require("./pipeline/stages/ConfidenceStage");

const AnswerStage =
    require("./pipeline/stages/AnswerStage");

const ResponseStage =
    require("./pipeline/stages/ResponseStage");


module.exports = function createPipeline() {

    return new Pipeline([

        new NormalizeStage(),

        new IntentStage(),

        new ProductStage(),

        new MemoryStage(),

        new QueryRewriteStage(),

        new CategoryStage(),

        new SearchStage(),

        new RerankStage(),

        new ConfidenceStage(),

        new AnswerStage(),

        new ResponseStage()

    ]);

};