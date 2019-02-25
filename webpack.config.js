const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    app: "./src/index.tsx"
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    modules: [path.resolve("./node_modules"), path.resolve("./src")]
  },
  output: {
    path: path.join(__dirname, "/dist/app"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: "less-loader"
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "all",
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          priority: 1
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new GenerateSW({
      runtimeCaching: [
        {
          urlPattern: /.*/,
          handler: "networkFirst"
        }
      ]
    })
  ]
};
