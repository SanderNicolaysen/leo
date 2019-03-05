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
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    dashboard: {
      entry: 'src/pages/dashboard/main.js',
      template: 'public/index.html',
      filename: 'dashboard/index.html'
    }
  }
};
