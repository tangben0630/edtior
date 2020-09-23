const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const BundleAn = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const merge = require('webpack-merge')
const common = require('./webpack.common')
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = merge(common, {
  devtool: 'source-map',
  module: {
    rules: [
      // {//解析scss
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: ['css-loader', 'postcss-loader', 'sass-loader', {
      //       loader: 'sass-resources-loader',
      //       options: {
      //         resources: path.resolve(__dirname, '../src/assets/scss/base.scss'),
      //       },
      //     }]
      //   })
      // },
      { //解析scss
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader',
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
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       test: /\.js(\?.*)?$/i,  //测试匹配文件,
  //       include: /\/includes/, //包含哪些文件
  //       excluce: /\/excludes/, //不包含哪些文件

  //       //允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。
  //       //返回true以uglify块，否则返回false。
  //       chunkFilter: (chunk) => {
  //         // `vendor` 模块不压缩
  //         if (chunk.name === 'vendor') {
  //           return false;
  //         }
  //         return true;
  //       },
  //       cache: false,   //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
  //       parallel: true,  //使用多进程并行运行来提高构建速度
  //     }),

  //   ],
  // },
  plugins: [
    new CleanWebpackPlugin(), //清理dist
    new MiniCssExtractPlugin({
      filename: "[name].[chunkhash:8].css",
    }),
    new UglifyJSPlugin(),
    // new BundleAn(),
  ]
})