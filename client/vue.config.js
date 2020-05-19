module.exports = {
  publicPath: './',
  outputDir: '../server/static/html',
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:80',
        ws: false
      }
    }
  }
}