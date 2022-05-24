// development config

const webpack = require("webpack");
const { merge } = require("webpack-merge");

const { resolve } = require("path");

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const commonConfig = require("./configs/webpack.common.js");

module.exports = merge(commonConfig, {
  context: resolve(__dirname),
  entry: ["./server.tsx"],

  mode: "production",

  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
            plugins: ["babel-plugin-styled-components"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),

    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: resolve(
        __dirname,
        "..",
        "reports",
        "server-bundle-report.html"
      ),
      openAnalyzer: false,
    }),
  ],

  performance: {
    hints: false,
  },
});
