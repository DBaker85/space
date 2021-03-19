//   const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const excludedFolders = /(__mocks__|node_modules)/;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
// const { merge } = require("webpack-merge");
const { resolve, join } = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devtool: "source-map",
  context: resolve(__dirname),
  entry: "./src/index.tsx",
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
    },

    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true,
        exclude: excludedFolders,
      }),
    ],
  },
  output: {
    filename: "[name].[fullhash].min.js",
    path: resolve(__dirname, "dist"),
    publicPath: "/",
  },
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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[fullhash].[ext]",
            outputPath: "astern/fonts/",
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
          "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
        ],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },

      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },

  performance: {
    hints: false,
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: resolve(
        __dirname,
        "reports",
        "docs-analysis-report.html"
      ),
      openAnalyzer: false,
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "public",
    //       to: resolve(__dirname, "..", "..", ".docs", "astern", "favicons"),
    //     },
    //   ],
    // }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
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
            env: { ...process.env, NODE_ENV: "production" },
          },
        };
      },
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
  ],
};
