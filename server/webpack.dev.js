// development config

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const nodeExternals = require('webpack-node-externals');
const { resolve } = require("path");

module.exports = {
  context: resolve(__dirname),
  entry: [    "webpack-dev-server/client?http://localhost:8282", // bundle the client for webpack-dev-server and connect to the provided endpoint
    "webpack/hot/only-dev-server", // bundle the client for hot reloading, only- means to only hot reload for successful updates
    "./dev-server.ts",
  ],
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: {loader: "babel-loader",
        options: {
          presets: ["@babel/preset-typescript"]
        }},
        exclude: /node_modules/,
      }
     
    ],
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
  ],

  performance: {
    hints: false,
  },
};
