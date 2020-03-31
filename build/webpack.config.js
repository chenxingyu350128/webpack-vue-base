const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoader = require('vue-loader/lib/plugin')
const VuetifyLoad = require('vuetify-loader/lib/plugin')
const webpack = require('webpack')
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')


module.exports = {
  // 指定模式，这儿有none production development三个参数可选
  // 具体作用请查阅官方文档
  mode: 'development',
  // webpack打包的入口文件
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  // webpack打包的输出相关的额配置
  output: {
    // 打包过后的文件的输出的路径
    path: path.resolve(__dirname, '../dist'),
    // 打包后生成的js文件，带hash值来保证文件的唯一性
    filename: 'js/[name].[hash:4].js',
    // 生成的chunk文件名
    chunkFilename: 'js/[name].[hash:4].js',
    // 资源的引用路径（这个跟你打包上线的配置有关系）
    publicPath: '/'
  },
  // 配置devServer
  devServer: {
    // 默认情况不设置这个只能通过localhost:9000来访问，现在可以通过本机局域网ip来访问，
    // 比如192.168.12.21:9000，手机在这个局网内也可以访问
    // host: '0.0.0.0',
    hot: true,
    port: 9200,
    contentBase: './dist',
    clientLogLevel: 'error',// 关闭在浏览器控制台显示消息的功能，可能的值有 none, error, warning 或者 info（默认值）。这里我设置为只显示错误消息
    overlay: {
      errors: true,
      warnings: true
    },
    quiet: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }	
        ]
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            // options: {
            //   implementation: require('sass'),
            //   fiber: require('fibers'),
            //   indentedSyntax: true // optional
            // },
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                // indentedSyntax: true // optional
              },
            },
          },
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     implementation: require('dart-sass')
          //   }
          // },
          // {
          //   loader: 'postcss-loader'
          // }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 当文件大于5kb时走file-loader相关的配置
              limit: 5120,
              // 这个参数要设置成false,不然生成图片的路径时[object Module]
              esModule: false,
              // 当文件大于5kb时走file-loader相关的配置
              fallback: 'file-loader',
              // 生成的路径和文件名
              name: 'images/[name].[hash:4].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              esModule: false,
              fallback: 'file-loader',
              name: 'media/[name].[hash:4].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 5120,
              esModule: false,
              fallback: 'file-loader',
              name: 'fonts/[name].[hash:4].[ext]'
            }
          }
        ]
      },
      
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: path.resolve(__dirname, '../dist/index.html')
    }),
    new VueLoader(),
    new VuetifyLoad({
      match (originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith('core-')) {
          return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
        }
      }
    }),
    new webpack.NamedModulesPlugin(), // 辅助HotModuleReplacementPlugin插件
    new webpack.HotModuleReplacementPlugin(), // 启用热更新必须的
    new friendlyErrorsWebpackPlugin()

  ],
  resolve: {
    alias: {
      // 写了这句，我们可以这样写代码 import Vue from 'vue', 并且引入的是vue/dist/vue.runtime.esm.js这个版本，不然默认引入的是vue.js。这个在github的vue官方仓库dist目录下有解释。
      'vue$': 'vue/dist/vue.runtime.esm.js',
      // 写了这句，我们可以这样写代码 import api from '@/api/api.js'，省去到处找路径定位到src的麻烦
      '@': path.resolve(__dirname, '../src')
    },
    // 添加一个 resolve.extensions 属性，方便我们引入依赖或者文件的时候可以省略后缀
    // 我们在引入文件时可以这样写 import api from '@/api/api'。
    extensions: ['*', '.js', '.vue']
  },
  
  
}
