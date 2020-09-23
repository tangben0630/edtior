const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const smp = new SpeedMeasurePlugin();
const env = process.env.NODE_ENV //环境

module.exports = smp.wrap({
  mode: env, //webpack 打包的环境
  entry: { //入口
    app: ["./src/main.js"],
    vendor: ["vue", "vuex", "axios", "vuescroll", "swiper", "sortablejs"],
  },
  output: { //出口
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:5].js'
  },
  module: {
    rules: [{ //解析vue
        test: /\.vue$/,
        use: [{
            loader: 'cache-loader',
          },
          {
            loader: 'vue-loader',
          }
        ]
      },
      { //解析js
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ['cache-loader', {
          loader: "thread-loader",
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: ['cache-loader', {
          loader: 'url-loader',
          options: {
            limit: 10240,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }]
      },
    ]
  },
  plugins: [ //一些插件
    new HtmlWebpackPlugin({ //html 模板，选取的是根目录下的 index.html
      title: 'editor',
      filename: 'index.html',
      template: 'index.html'
    }),
    new vueLoaderPlugin(), //解析vue文件
    // new HardSourceWebpackPlugin()

  ],
  optimization: {
    usedExports: true,
    splitChunks: {
      //对entry进行拆分
      chunks: 'all',
      minSize: 3000,
      cacheGroups: {
        //比如你要单独把vue等官方库文件打包到一起，可以使用这个缓存组，如果要具体到库文件，可以单独给库文件写一个缓存组
        vendor: {
          test: /node_modules/,
          priority: 10,
          name: "vendor",
          minChunks: 2,
          enforce: true
        },
        //这里定义分离前被引用过两次的文件，将其一同打包到common.js,最小为30kb
        common: {
          name: "common",
          minChunks: 2,
          minSize: 10000
        },
      }
    }
  },
  resolve: { //解析文件地址
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js', //vue推荐的文件
      '@': path.resolve(__dirname, '../src'), //@代表目录 src
      '@components': path.resolve(__dirname, '../src/components'), //@代表目录 src/components
      '@mixin': path.resolve(__dirname, '../src/mixin'), //@代表目录 src/mixin
      '@public': path.resolve(__dirname, '../src/components/public'), //@代表目录 src/components/public
      '@chat': path.resolve(__dirname, '../src/components/chat'), //@代表目录 src/components/public
      '@template': path.resolve(__dirname, '../src/components/template'),
      '@tool': path.resolve(__dirname, '../src/components/tool'),
      '@router': path.resolve(__dirname, '../src/router'),
      '@assets': path.resolve(__dirname, '../src/assets'),
      '@store': path.resolve(__dirname, '../src/store'),
    },
    extensions: ['*', '.js', '.json', '.vue'] //js  vue json 可以不写拓展名
  },
  externals: {
    "vue": "Vue",
    "vuex": "Vuex",
    "axios": "axios",
    "vuescroll": "vuescroll",
    'element-ui': 'ElementUI',
    "swiper": "swiper",
    "sortablejs": "Sortable",
    "jquery": "jQuery"
  }
});