import { resolve } from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { Configuration } from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

interface Argv {
  mode: "development" | "production";
  port: number;
}

export default (_: unknown, argv: Argv) => {
  const isDev = argv.mode === "development";
  const devServer: DevServerConfiguration = {
    port: argv.port ?? 3000,
    open: true,
  };

  const config: Configuration = {
    entry: resolve(__dirname, "src", "index.tsx"),
    mode: argv.mode,
    devtool: isDev ? "source-map" : false,
    output: {
      path: resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.m\.s(a|c)ss$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: true,
                sourceMap: isDev,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /\.m.(s(a|c)ss)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.[jt]sx?$/,
          loader: "esbuild-loader",
          options: {
            target: "es2015",
          },
        },
      ],
    },
    devServer,
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".scss"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve(__dirname, "public", "index.html"),
      }),
      new MiniCssExtractPlugin(),
    ],
    optimization: {
      runtimeChunk: "single",
    },
  };

  return config;
};
