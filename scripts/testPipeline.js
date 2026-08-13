class Pipeline {

    constructor(stages = []) {
        this.stages = stages;
    }

    async run(context) {
        for (const stage of this.stages) {
            context = await stage.execute(context);
        }

        return context;
    }
}

module.exports = Pipeline;