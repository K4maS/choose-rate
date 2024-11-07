const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', 

  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // Извлекает CSS в отдельные файлы
          'css-loader',
          'sass-loader', // Компилирует SCSS в CSS
          
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      // Обработка изображений
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource', // Встроенная обработка файлов в Webpack 5
        generator: {
          filename: 'images/[name].[hash][ext]', // Куда помещать изображения в dist
        },
      },
      {
        test: /\.css$/,  
        use: ['style-loader', 'css-loader'], 
      },
    
    ],

  },
  
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), 
    },
    hot: true, 
    open: true, 
    watchFiles: ['src/*.html', 'src/styles/*.scss'],
  },

  mode: 'development', 
};