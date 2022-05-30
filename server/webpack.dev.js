// development config

const webpack = require("webpack");
const { merge } = require("webpack-merge");

const { resolve } = require("path");

const StartServerPlugin = require("start-server-nestjs-webpack-plugin");

const commonConfig = require("./configs/webpack.common.js");

module.exports = merge(commonConfig, {
  context: resolve(__dirname),
  entry: [
    "webpack/hot/poll?1000", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    "./dev-server.tsx",
  ],
  watch: true,
  mode: "development",

  module: {
    rules: [],
  },
  devServer: {
    hot: true, // enable HMR on the server
  },
  devtool: "cheap-module-source-map",

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),

    new StartServerPlugin({ name: "server.js", nodeArgs: ["--inspect"] }),
  ],

  performance: {
    hints: false,
  },
});
