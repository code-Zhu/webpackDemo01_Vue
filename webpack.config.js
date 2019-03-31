const path = require('path')
const isDev = process.env.NODE_ENV === "development"

const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin') // 

const config = {
  entry: path.join(__dirname, 'src/index.js'), // 入口文件
  output: { // 输出
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      { // 处理图片
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', // 图片转base64
            options: {
              limit: 1024,
              name: '[name]-mydiyname.[ext]'
            }
          }
        ]
      },
      { // css预处理
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: '8080',
    host: '0.0.0.0', // 0.0.0.0能够使局域网ip访问该项目
    overlay: {
      errors: true // 显示错误，方便定位错误，及时改掉
    },
    open: true, // 自动打开了浏览器
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}

module.exports = config