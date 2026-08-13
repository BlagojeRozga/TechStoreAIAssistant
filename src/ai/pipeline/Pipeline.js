class Pipeline {

    constructor(stages = []) {
        this.stages = stages;
    }

    async run(context) {

        for (const stage of this.stages) {

            context = await stage.execute(context);

            if (context.stopPipeline) {
                break;
            }

        }

        return context;
    }
}

module.exports = Pipeline;