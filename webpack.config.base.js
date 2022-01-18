//公共配置
 const path = require("path");
 // 清空打包文件夹
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
 module.exports = {
   //入口 执行构建的入口 项目入口 值是字符串 数组 对象
   entry:"./src/index.js",
   // 出口
   output:{
     clean:true,
     // 构建的文件资源放在哪儿？必须是绝对路径
     path:path.resolve(__dirname,"./dist"),
     // 构建的文件资源叫啥 默认是 main.js
     filename:"[name].js",
     assetModuleFilename: 'images/[hash][ext][query]'
   },
   // loader 模块转换 从右到左，从下到上
   module:{
     rules: [
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
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type:'asset',
          generator:{
            filename: 'images/[contenthash][ext][query]',
            publicPath: './'
          },
          // parser:{
          //   dataUrlCondition:{
          //       maxSize : 10 * 1024 * 1024
          //   }
          // }
       },
       {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline'
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
    //  alias: {
    //    "@":path.join(__dirname, "./"),
    //  },
     // 省略引入模块后缀名
     extensions:['.js','.json']
   },
   externals: {
     //jquery通过script引⼊之后，全局中即有了jQuery变量
     'jquery':'jQuery'
   },
   // 插件配置
   plugins: [
      new CleanWebpackPlugin()
   ],
 }