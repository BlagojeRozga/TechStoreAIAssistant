const createPipeline = require("./createPipeline");

class AIEngine {

    constructor() {

        this.pipeline = createPipeline();

    }

    async ask(message, sessionId) {

        const context = await this.pipeline.run({

            message,

            sessionId

        });

        return context.response;

    }

}

module.exports = new AIEngine();