const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");

module.exports = {
  mode: "none",
  devtool: false,
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
  plugins: [new CleanWebpackPlugin()],
};
