module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:80',
        ws: false
      }
    }
  }
}