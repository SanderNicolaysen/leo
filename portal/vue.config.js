// vue.config.js
module.exports = {
  publicPath: '/portal/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  devServer: {
    proxy: 'http://localhost:8081'
  }
};
