const path = require('path'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.js', 

  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist'), 
    clean: true,
  },
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,  
          },
          format: {
            comments: false, 
          },
        },
        extractComments: false,  
      }),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
   
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader',
          'sass-loader', 
          
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
       
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',  
        generator: {
          filename: 'images/[name].[hash][ext]',  
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
    new WebpackObfuscator({
      rotateStringArray: true,
      stringArray: true,
      stringArrayThreshold: 0.75,
    }, ['excluded_file.js']),
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