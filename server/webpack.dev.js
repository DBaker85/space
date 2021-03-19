// development config

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const StartServerPlugin = require("start-server-nestjs-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  context: resolve(__dirname),
  entry: [
    "webpack/hot/poll?1000", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    "./server.tsx",
  ],
  watch: true,
  mode: "development",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "server.js",
    // publicPath: '/assets/',
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?1000"],
    }),
  ],
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    hot: true, // enable HMR on the server
  },
  devtool: "cheap-module-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: resolve(process.cwd(), "..", "client", "dist"),
          to: resolve(__dirname, "dist", "public"),
        },
      ],
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!public*"],
    }),
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
};
