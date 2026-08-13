const fs = require("fs");
const path = require("path");

const vectorStorePath = path.join(
    process.cwd(),
    "generated",
    "vectorStore.json"
);

function getVectorStore() {

    const data = fs.readFileSync(vectorStorePath, "utf8");

    return JSON.parse(data);

}

module.exports = {
    getVectorStore
};