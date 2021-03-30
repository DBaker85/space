const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const excludedFolders = /(__mocks__|node_modules)/;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { resolve, extname } = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { getType } = require("mime");
const HtmlWebpackInjectPreload = require("@principalstudio/html-webpack-inject-preload");

const commonConfig = require("./webpack.common.js");

const nameBuilder = (filename) => {
  const splitnames = filename.split("/").pop().split(".");
  const name = `${splitnames[0]}.${splitnames[splitnames.length - 1]}`;
  return name;
};

const splitPath = (path) => path.replace(/\\/g, "/").split("/");

const fontRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.ttf|.woff|.woff2|.eot)$/i;
const imgRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.svg|.png|.gif)$/i;

module.exports = merge(commonConfig, {
  context: resolve(__dirname),
  entry: resolve(__dirname, "src", "index.tsx"),
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
    ],
  },

  performance: {
    hints: false,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "public", "index.html"),
      filename: resolve(__dirname, "dist", "index.html"),
      publicPath: "/",
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
    new HtmlWebpackInjectPreload({
      files: [
        {
          match: /.*\.woff2?$/,
          attributes: { as: "font" },
        },
      ],
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
    new WebpackManifestPlugin({
      fileName: resolve(__dirname, "dist", "push_manifest.json"),
      filter: (file) => !file.name.endsWith("map"),
      generate: (seed, files) => {
        const initial = files
          .filter((file) => file.isInitial && !file.name.includes("runtime"))
          .map(({ name, path }) => {
            const ext = extname(name);
            return {
              path: splitPath(path),
              extension: ext,
              mimeType: getType(ext),
            };
          });

        const fonts = files
          .filter((file) => fontRegex.test(file.path))
          .reduce((manifest, { name, path }) => {
            const ext = extname(name);

            return {
              ...manifest,
              [nameBuilder(path)]: {
                path: splitPath(path),
                extension: ext,
                mimeType: getType(ext),
              },
            };
          }, seed);

        const images = files
          .filter((file) => imgRegex.test(file.name))
          .reduce((manifest, { name, path }) => {
            const ext = extname(name);
            return {
              ...manifest,
              [nameBuilder(name)]: {
                path: splitPath(path),
                extension: ext,
                mimeType: getType(ext),
              },
            };
          }, seed);

        return { initial, fonts, images };
      },
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
});
