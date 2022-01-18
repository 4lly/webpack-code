// webpack 是基于nodejs的
/**
 * 1 Chunk = 1 bundle
 * chunk是代码块
 * bundle是资源文件
 * 1个chunk可以是多个模块
 * 模块？ nodejs里面万物皆模块
 */
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
// 热模块替换需要用到
const webpack = require("webpack");
// 开发生产环境区分
const merge = require("webpack-merge")

module.exports = {
  // 上下文 项目打包的相对路径 必须是绝对路径
  // context:process.cwd(),
  //入口 执行构建的入口 项目入口 值是字符串 数组 对象
  entry:"./src/index.js",
  // entry:["./src/index.js","./src/other.js"], // 数组 充当于一个拼接的作用  webpack会自动生成另一个入口模块，并将数组中的每一个指定的模块加载进来，并将最后一个模块的module.exports作为入口模块的module.exports导出。
  // 多入口
  // entry:{
  //   index:"./src/index.js",
  //   other:"./src/other.js",
  // },
  // 出口
  output:{
    // 构建的文件资源放在哪儿？必须是绝对路径
    path:path.resolve(__dirname,"./dist"),
    // 构建的文件资源叫啥 默认是 main.js
    filename:"main.js",
    // filename:"[name]-[hash:6].js", // 占位符 多出口的对应的多入口
    /**
     * 占位符
     * hash 整个项目的hash值，每构建一次，就会有一个新的hash值
     * chunkhash 根据不同的entry进行依次解析，结构对应的chunk,生成相应的hash
     * 只要组成的entry的模块没有内容改变，则对应的hash不变
     * name
     * id
     */
    // publicPath:"cdnUrl.com"
  },
  // 构建模式 none production development
  mode:'development',
  // devtool:"cleap-inline-source-map",
  // loader 模块转换 从右到左，从下到上
  module:{
    rules: [
      //loader模块处理
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer")({
                  overrideBrowserslist: ["last 2 versions",">1%"]
                  })
                ]
              },
            },
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          // MiniCssExtractPlugin.loader,
          "style-loader",
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require("autoprefixer")({
                  overrideBrowserslist: ["last 2 versions",">1%"]
                  })
                ]
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
						//placeholder占位符[name]⽼资源模块的名称
						//[ext]⽼资源模块的后缀
						name: "[name]_[hash:6].[ext]",
						//打包后的存放位置
						outputPath: "static/images/",
            limit: 2048
					}
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/i,
        use: 'file-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
         loader: 'babel-loader',
         options: {
          presets: ['@babel/preset-env'],
         },
        },
       },
    ]
  },
  resolve:{
    // 查找第三方依赖
    modules: [path.resolve(__dirname, "./node_modules")],
    // 起别名 减少查找过程
    alias: {
      "@":path.join(__dirname, "./"),
    },
    // 省略引入模块后缀名
    extensions:['.js','.json','.jsx','.ts']
  },
  externals: {
		//jquery通过script引⼊之后，全局中即有了jQuery变量
		'jquery':'jQuery'
	},
  optimization: {
    // js 摇树优化
    usedExports: true,//哪些导出的模块被使⽤了，再做打包
    //代码分割
    // splitChunks: {
    //   chunks: "all", //所有的chunks代码公共的部分分离出来成为⼀个单独的⽂件
    // },
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
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].css"
    // }),
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
     new OptimizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"), //引⼊cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      }
     }),
    //  清除css摇树
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
       safelist: ['body']
    })
  ],
}