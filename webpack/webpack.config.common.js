
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const dotenv = require("dotenv-webpack");
const forkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (env) => {
  return {
    entry: "./src/index.tsx",
    output: {
      path: path.join(__dirname, "../dist"),
      filename: "bundle.js",
      publicPath: "/",
      clean: true,
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        "@": path.resolve(__dirname, "../src/"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
        {
          test: /\.css?$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|woff|woff2|ttf|ico)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      removeRasterImages: false,
                      removeStyleElement: false,
                      removeUnknownsAndDefaults: false,
                      removeViewBox: false,
                    },
                  ],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new dotenv({
        path: env.production ? "./env/.env" : "./env/dev.env",
      }),
      new forkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
          mode: "write-references",
        },
      }),
    ],
  };
};
