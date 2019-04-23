const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const appConfig = {
    cache: true,
    devtool: "source-map",

    entry: path.resolve(__dirname, "./src/functions/index.ts"),
    output: {
        filename: "./index.js",
        path: path.resolve(__dirname, "./dist/functions"),
        libraryTarget: "this"
    },

    target: "node",
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.functions.json"
                }
            }
        ]
    },

    resolve: {
        extensions: [".ts", ".js"]
    },
    externals: [nodeExternals()],

    plugins: [new CopyWebpackPlugin([{ from: "package.json", to: "package.json" }])]
};

module.exports = appConfig;
