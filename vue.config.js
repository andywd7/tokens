module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/toolbox.scss";`,
        sourceMap: true
      }
    },
    extract: true,
    sourceMap: true
  },
  productionSourceMap: false
}
