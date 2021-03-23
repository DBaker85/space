//   const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const excludedFolders = /(__mocks__|node_modules)/;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
// const { merge } = require("webpack-merge");
const { resolve, join, sep } = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CopyPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { getType } = require("mime");

const nameBuilder = (filename) => {
  const splitnames = filename.split("/").pop().split(".");
  const name = `${splitnames[0]}.${splitnames[splitnames.length - 1]}`;
  return name;
};


const fontRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.ttf|.woff|.woff2|.eot)$/i;
const imgRegex = /([a-zA-Z0-9\s_\\.\-\(\):])+(.svg|.png|.gif)$/i;


module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

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
            env: { ...process.env, NODE_ENV: "production" },
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
    new WebpackManifestPlugin({
      fileName: resolve(__dirname, "dist", "push_manifest.json"),
      filter: (file) => !file.name.endsWith("map"),
      generate: (seed, files) => {
        
        const initial = files
          .filter((file) => file.isInitial && !file.name.includes("runtime"))
          .map(({ name, path }) => {
            const splitnames = name.split(sep).pop().split(".");
            const ext = `${splitnames[splitnames.length - 1]}`;
            return{
            path: path,
            filePath: join(sep, "static", path),
            extension: ext,
            mimeType: getType(ext)
          }});

        const fonts = files
          .filter(file => fontRegex.test(file.path))
          .reduce(
            (manifest, { name, path }) => {
             
              const splitnames = name.split(sep).pop().split(".");
              const ext = `${splitnames[splitnames.length - 1]}`;
              return {
              ...manifest,
              [nameBuilder(path)]: { path, filePath: `./build${path}`,extension: ext,
              mimeType: getType(ext) }
            }},
            seed
          );

        const images = files
          .filter(file => imgRegex.test(file.name))
          .reduce(
            (manifest, { name, path }) => {
              
              const splitnames = name.split(sep).pop().split(".");
            const ext = `${splitnames[splitnames.length - 1]}`;
              return {
              ...manifest,
              [nameBuilder(name)]: { path, filePath: `./build${path}`, extension: ext,
              mimeType: getType(ext) }
            }},
            seed
          );

        return { seperator: sep, initial, fonts, images };
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
};
