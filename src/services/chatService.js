const aiEngine = require("../ai/AIEngine");

async function chat(message, sessionId = "default") {

    const result = await aiEngine.ask(
        message,
        sessionId
    );

    return result;
}

module.exports = {
    chat
};