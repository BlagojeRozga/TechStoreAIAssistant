function rerank(results) {

    return results
        .sort((a, b) => b.score - a.score);

}

module.exports = {
    rerank
};