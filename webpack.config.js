const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader");
const webpack = require("webpack");

module.exports = (env, options) => {
    const dev = options.mode === "development";

    return {
        entry: {
            app: "./src/index.tsx",
        },
        devServer: {
            historyApiFallback: true,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            modules: [path.resolve("./node_modules"), path.resolve("./src")],
        },
        output: {
            path: path.join(__dirname, "/dist/app"),
            filename: dev ? "[name].js" : "[name].[hash].js",
            chunkFilename: dev ? "[name].js" : "[name].[hash].js",
            publicPath: "/",
        },

        devtool: dev ? "source-map" : "none",

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "awesome-typescript-loader",
                    options: {
                        useCache: true,
                        forceIsolatedModules: true,
                    },
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",
                        },
                    ],
                },
            ],
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: "all",
                        test: /[\\/]node_modules[\\/]/,
                        enforce: true,
                        priority: 1,
                    },
                },
            },
            minimizer: [
                new TerserPlugin({
                    cache: dev,
                    sourceMap: dev,
                    parallel: true,
                }),
            ],
        },
        plugins: [
            new CheckerPlugin(),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
            }),
            new CopyPlugin([
                { from: "*.png", to: "assets", context: "src/assets" },
                { from: "src/manifest.json", to: "manifest.json" },
            ]),
            new GenerateSW({
                skipWaiting: true,
                clientsClaim: true,
                runtimeCaching: [
                    {
                        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "images",
                        },
                    },
                    { urlPattern: /\.(?:js|html|json)$/, handler: "StaleWhileRevalidate" },
                ],
                navigateFallback: "/index.html",
            }),
            new webpack.DefinePlugin({
                __DEV__: JSON.stringify(dev),
            }),
        ],
    };
};
