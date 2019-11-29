const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      'react': 'preact'
    }
  },
  module: {
    rules: [{ test: /\.[tj]sx?$/, loader: "babel-loader" }]
  },
  devServer: {
    publicPath: '/dist/'
  }
};
