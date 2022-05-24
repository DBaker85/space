const { resolve } = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  output: {
    path: resolve(__dirname, "..", "dist"),
    filename: "server.js",
    // publicPath: '/assets/',
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".jsx", ".ts", ".tsx", ".mjs", ".js"],
  },
  target: "node",
  node: {
    __dirname: false,
  },
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?1000"],
    }),
    "mongodb-client-encryption",
    "aws4",
    "saslprep",
    "kerberos",
    "snappy",
    "bson-ext",
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name].[hash][ext][query]",
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: resolve(process.cwd(), "..", "client", "dist"),
          to: resolve(__dirname, "..", "dist", "public"),
        },
      ],
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*", "!public*"],
    }),
    new Dotenv(),
  ],
};
