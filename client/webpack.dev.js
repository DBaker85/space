const { merge } = require("webpack-merge");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const { resolve, join } = require("path");

const commonConfig = require("./webpack.common.js");

module.exports = merge(commonConfig, {
  devtool: "source-map",
  context: resolve(__dirname),
  entry: [
    require.resolve("webpack-dev-server/client") + "?/",
    require.resolve("webpack/hot/dev-server"),
    resolve(__dirname, "src", "index.tsx"),
  ],
  mode: "development",
  devServer: {
    hot: true, // enable HMR on the server
    contentBase: join(__dirname, "public"),
  },

  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
            plugins: [require.resolve("react-refresh/babel")],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },

  performance: {
    hints: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: resolve(__dirname, "public", "index.html"),

      templateParameters(compilation, assets, options) {
        return {
          compilation,
          webpack: compilation.getStats().toJson(),
          webpackConfig: compilation.options,
          htmlWebpackPlugin: {
            files: assets,
            options,
          },
          process: {
            ...process,
            env: { ...process.env, NODE_ENV: "development" },
          },
        };
      },
    }),

    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
});
