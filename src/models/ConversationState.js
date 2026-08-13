class ConversationState {

    constructor() {

        this.currentProduct = null;

        this.currentCategory = null;

        this.lastIntent = null;

        this.history = [];

    }

}

module.exports = ConversationState;