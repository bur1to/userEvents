module.exports = {
  resolve: {
    fallback: {
      vm: require.resolve('vm-browserify'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
      path: require.resolve('path-browserify'),
      util: require.resolve('util/'),
      zlib: require.resolve('browserify-zlib'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http')
    }
  }
};
