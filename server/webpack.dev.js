// development config

const webpack = require("webpack");
const { merge } = require("webpack-merge");
const nodeExternals = require('webpack-node-externals');
const { resolve } = require("path");
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = {
  context: resolve(__dirname),
  entry: [   'webpack/hot/poll?1000',// bundle the client for hot reloading, only- means to only hot reload for successful updates
    "./dev-server.ts",
  ],
  mode: "development",
  output: {
    path: resolve(__dirname, 'dist'),
    // path: "/",
    filename: 'server.js',
    publicPath: '/assets/',
    libraryTarget: 'commonjs2'
},
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  target: 'node',
  externals: [nodeExternals({
    allowlist: ['webpack/hot/poll?1000']
})],
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
    new StartServerPlugin({'name': 'server.js', nodeArgs: ['--inspect']}),
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
