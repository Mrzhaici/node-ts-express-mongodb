const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");
const nodeExternals = require("webpack-node-externals");
const path = require("path");
const dotenv = require("dotenv");
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

// Init the environment variable
dotenv.config();

module.exports = {
  mode: process.env.NODE_ENV || "node",
  devtool:
    process.env.NODE_ENV == "development" ? "eval-cheap-source-map" : false,
  /**
   * Iterate through all the files that need to be packaged under the file
   * Reference: https://github.com/Milanzor/webpack-watched-glob-entries-plugin
   */
  entry: WebpackWatchedGlobEntries.getEntries([
    path.resolve(__dirname, "src/**/*.ts"),
  ]),
  // in order to ignore built-in modules like path, fs, etc.
  target: "node",
  // in order to ignore all modules in node_modules folder
  externals: [nodeExternals()],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  // watch: true,
  plugins: [
    // Copies individual files or entire directories to the build directory
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/views'),
          to: "views"
        }
      ]
    })
    // Remove the dist before packing
    // new CleanWebpackPlugin(),
    // Enable Hot Module Replacement (HMR)
    // new webpack.HotModuleReplacementPlugin()
  ],
};
