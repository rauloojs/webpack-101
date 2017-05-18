const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");


var isProd = process.env.NODE_ENV === 'production' // true or false
var cssDev = ['style-loader', "css-loader", "sass-loader"];
var cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: ["css-loader", "sass-loader"],
  publicPath: '/dist'
});
var cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          // Include publicPath??
          'file-loader?name=[name].[ext]&outputPath=images/',
          'image-webpack-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    stats: 'errors-only',
    open: true,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Project demo',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      excludeChunks: ['contact'],
      template: './src/index.pug' // Load a custom template (ejs by default see the FAQ for details)
    }),
    new HtmlWebpackPlugin({
      title: 'Contact page',
      hash: true,
      chunks: ['contact'],
      filename: 'contact.html',
      template: './src/contact.html'
    }),
    new ExtractTextPlugin({
      filename: "app.css",
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
