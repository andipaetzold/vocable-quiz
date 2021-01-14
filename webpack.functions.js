const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

module.exports = (env, options) => {
    const dev = options.mode === "development";

    return {
        cache: true,
        devtool: "source-map",

        entry: path.resolve(__dirname, "./src/functions/index.ts"),
        output: {
            filename: "./index.js",
            path: path.resolve(__dirname, "./dist/functions"),
            libraryTarget: "this",
        },

        target: "node",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loader: "awesome-typescript-loader",
                    options: {
                        configFileName: "tsconfig.functions.json",
                        useCache: true,
                        forceIsolatedModules: true,
                    },
                },
            ],
        },

        resolve: {
            extensions: [".ts", ".js"],
        },
        externals: [nodeExternals()],

        plugins: [
            new CopyWebpackPlugin([{ from: "package.json", to: "package.json" }]),
            new webpack.DefinePlugin({
                __DEV__: JSON.stringify(dev),
            }),
        ],
    };
};
