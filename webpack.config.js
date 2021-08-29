const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack')


module.exports = {
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader" }]
      },
      {
        test: /\.css$/, 
        use: [ "style-loader", "css-loader" ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [ 'file-loader' ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebPackPlugin ({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
};