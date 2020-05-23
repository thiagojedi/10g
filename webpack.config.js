const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [new MiniCssExtractPlugin()],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      react: "preact/compat",
      react$: "preact/compat",
      "react-dom": "preact/compat",
      "react-dom$": "preact/compat",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              esModule: true,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.[tj]sx?$/,
        loader: "babel-loader",
      },
    ],
  },
  devServer: {
    publicPath: "/dist/",
  },
  devtool: "source-map",
};
