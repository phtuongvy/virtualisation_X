module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:30001', // replace with your server address
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }