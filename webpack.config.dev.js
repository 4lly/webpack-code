
 //开发配置
const path = require("path");
// 生成html模板
const htmlWebpackPlugin = require("html-webpack-plugin");
// 开发生产环境区分
const {merge} = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require('./webpack.config.base.js')

const devConfig = {
  // 构建模式 none production development
  mode:'development',
  devtool:"inline-source-map",
  // 出口
  output:{
    // 构建的文件资源放在哪儿？必须是绝对路径
    path:path.resolve(__dirname,"./dist"),
    // 构建的文件资源叫啥 默认是 main.js
    filename:"[name].js",
  },
  devServer: {
		static: {
      directory: path.join(__dirname, './dist'),
    },
    open: ['/app.html'],
		port: 8888,
    hot:true,
    proxy:{
      "/api":{
        target:"http://127.0.0.1/9000"
      }
    },
    onBeforeSetupMiddleware(devServer){
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      devServer.app.get('/api/info', function (req, res) {
        res.json({ custom: 'response' });
      });
    },
	},
  // 插件配置
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new htmlWebpackPlugin({
      title: "My App",
      filename: "app.html",
      template: "./src/public/index.html"
      })
  ],
};


module.exports = ()=> merge(baseConfig,devConfig)