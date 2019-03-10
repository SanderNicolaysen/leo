// vue.config.js
module.exports = {
  publicPath: '/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  devServer: {
    proxy: 'http://localhost:8081'
  },
  pages: {
    portal: {
      entry: 'src/pages/portal/main.js',
      template: 'public/index.html',
      filename: 'portal/index.html'
    },
    dashboard: {
      entry: 'src/pages/dashboard/main.js',
      template: 'public/index.html',
      filename: 'dashboard/index.html'
    },
    queueNumberDisplay: {
      entry: 'src/pages/queueNumberDisplay/main.js',
      template: 'public/index.html',
      filename: 'queueNumberDisplay/index.html'
    }
  }
};
