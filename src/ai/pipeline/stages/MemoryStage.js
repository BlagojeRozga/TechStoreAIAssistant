const conversationMemory =
    require("../../../services/conversationMemory");

class MemoryStage {

    async execute(context) {

        const session =
            conversationMemory.getSession(
                context.sessionId
            );

        conversationMemory.addMessage(
            context.sessionId,
            "user",
            context.message
        );

        if (
            (!context.product ||
             !context.product.brand) &&
            session.product
        ) {
            context.product = session.product;
        }

        if (
            context.product &&
            context.product.brand
        ) {
            session.product = context.product;
        }

        return context;
    }

}

module.exports = MemoryStage;