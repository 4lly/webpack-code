const path = require("path");
// 清空打包文件夹
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
// 生成html模板
const htmlWebpackPlugin = require("html-webpack-plugin");
// css分包
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 清除css摇树
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob =require('glob-all');
 // 开发生产环境区分
const {merge} = require("webpack-merge");
const webpack = require("webpack");
const baseConfig = require('./webpack.config.base.js')

 const proConfig = {
   // 构建模式 none production development
   mode:'production',
   // 出口
   output:{
    // 构建的文件资源放在哪儿？必须是绝对路径
    path:path.resolve(__dirname,"./dist"),
    // 构建的文件资源叫啥 默认是 main.js
    filename:"[name].js",
  },
  optimization: {
    // js 摇树优化
    usedExports: true,//哪些导出的模块被使⽤了，再做打包
    concatenateModules: true,//作用域提升
    //代码分割
    splitChunks: {
      chunks: "all", //所有的chunks代码公共的部分分离出来成为⼀个单独的⽂件
      automaticNameDelimiter: '-',//打包分割符号
      minSize: 30000,//最⼩尺⼨，当模块⼤于30kb
      minChunks: 1,//打包⽣成的chunk⽂件最少有⼏个chunk引⽤了这个模块
      cacheGroups: {//缓存组
        lodash: {
          test: /lodash/,
          name:"lodash", //要缓存的分隔出来的chunk名称
          priority: -10//缓存组优先级数字越⼤，优先级越⾼
        },
        other:{
          chunks: "initial", //必须三选⼀："initial" | "all" | "async"(默认就是async)
          test: /lodash/, //正则规则验证，如果符合就提取chunk,
          name:"other",
          minSize: 30000,
          minChunks: 1,
        }
      }
    },
  },
   // 插件配置
   plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    new htmlWebpackPlugin({
      title: "My App",
      filename: "app.html",
      template: "./src/public/index.html",
      minify: {
        //压缩HTML⽂件
        removeComments: true, //移除HTML中的注释
        collapseWhitespace: true, //删除空⽩符与换⾏符
        minifyCSS: true //压缩内联css
        }
     }),
    //  new OptimizeCSSAssetsPlugin({
    //   cssProcessor: require("cssnano"), //引⼊cssnano配置压缩选项
    //   cssProcessorOptions: {
    //     discardComments: { removeAll: true }
    //   }
    //  }),
    //  清除css摇树
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
       safelist: ['body']
    })
  ],
 };


 module.exports = merge(baseConfig,proConfig)