const chatService = require("../services/chatService");

async function chat(req, res) {
    try {
        const { message, sessionId } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: "Poruka je obavezna."
            });
        }

        const session = sessionId || "default";

        const answer = await chatService.chat(
            message,
            session
        );

        return res.json({
            success: true,
            answer
        });

    } catch (err) {
        console.error("========== CHAT ERROR ==========");
        console.error(err.stack);
        console.error("================================");

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
}

module.exports = {
    chat
};