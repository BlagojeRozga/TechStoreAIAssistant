const sessions = new Map();

function getSession(sessionId) {
    if (!sessions.has(sessionId)) {
        sessions.set(sessionId, {
            product: null,
            history: []
        });
    }

    return sessions.get(sessionId);
}

function addMessage(sessionId, role, message) {
    const session = getSession(sessionId);

    session.history.push({
        role,
        message,
        timestamp: Date.now()
    });

    if (session.history.length > 10) {
        session.history.shift();
    }
}

function clearSession(sessionId) {
    sessions.delete(sessionId);
}

module.exports = {
    getSession,
    addMessage,
    clearSession
};
