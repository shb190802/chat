module.exports = {
  publicPath: './',
  outputDir: '../static/html',
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:80',
        ws: false
      }
    }
  }
}