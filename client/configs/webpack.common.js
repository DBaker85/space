const { resolve } = require("path");
module.exports = {
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/img/[name].[hash][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "static/fonts/[name].[hash][ext][query]",
        },
      },
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-react",
              "@lingui/babel-preset-react",
            ],
            plugins: ["babel-plugin-styled-components", "macros"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "static/js/[name].[fullhash].min.js",
    path: resolve(process.cwd(), "dist"),
    publicPath: "/",
  },
};
