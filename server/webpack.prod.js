// development config

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");
const { resolve } = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const StartServerPlugin = require("start-server-nestjs-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  context: resolve(__dirname),
  entry: ["./server.tsx"],

  mode: "production",
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
    nodeExternals(),
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
        type: "asset/source",
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/source",
      },
    ],
  },
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
    new Dotenv(),
  ],

  performance: {
    hints: false,
  },
};
