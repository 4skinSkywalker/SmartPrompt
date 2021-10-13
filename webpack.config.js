let path = require("path");

module.exports = {
    entry: {
        main: "./index.js"
    },
    output: {
        filename: "./main.js",
        library: ["SmartPrompt"],
        path: path.resolve(__dirname, "docs")
    }
};