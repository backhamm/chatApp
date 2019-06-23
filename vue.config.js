module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true
    }
  },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
