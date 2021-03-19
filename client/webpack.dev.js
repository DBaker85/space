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
  entry: resolve(__dirname,"src","index.tsx"),
  mode: "development",

  output: {
    filename: "[name].[fullhash].min.js",
    path: resolve(__dirname, "dist", "static"),
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
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[fullhash].[ext]",
            outputPath: "/fonts/",
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?hash=sha512&digest=hex&name=/img/[contenthash].[ext]",
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
    hints: 'error',
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
   
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
   
    new HtmlWebpackPlugin({
      template:resolve(__dirname, "public", "index.html"),
      filename: resolve(__dirname, "dist", "index.html"),
      publicPath: "/static/",
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
   
   
    
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, "public"),
          to: resolve(__dirname, "dist"),
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: resolve(
        __dirname,
        "reports",
        "docs-analysis-report.html"
      ),
      openAnalyzer: false,
    }),
  ],
};
