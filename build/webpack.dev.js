const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {//开发的配置
    contentBase: './dist',
    hot: true,
    port: 9001,
    open: true
  },
  module: {
    rules: [
      {//解析scss
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, '../src/assets/scss/base.scss'),
            },
          }
        ]
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),//
    new webpack.HotModuleReplacementPlugin(),//热替换
    new MiniCssExtractPlugin()
  ],
  performance: {//性能方面
    hints: "error",//体积太大直接报错
    //入口起点的最大体积 整数类型（以字节为单位）
    maxEntrypointSize: 50000000,
    //生成文件的最大体积 整数类型（以字节为单位 300k）
    maxAssetSize: 30000000,
    //只给出 js 文件的性能提示
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith('.js');
    }
  }
})
