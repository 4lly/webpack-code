 // cross-env 开发生产环境区分
 const {merge} = require("webpack-merge");
 const baseConfig = require('./webpack.config.base.js');
 const devConfig = require('./webpack.config.dev.js');
 const proConfig = require('./webpack.config.pro.js');


module.exports = (env) => {

  const isPro  = process.env.NODE_ENV == 'pro'
  console.log(isPro ? "生产环境" : "开发环境");
  console.log(isPro)
  if (isPro){
    return merge(baseConfig,proConfig)
  } else {
    return merge(baseConfig,devConfig)
  }
}