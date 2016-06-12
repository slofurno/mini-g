var path = require('path');

module.exports = {
  entry: {
    search: './src/search',
    background: './src/background'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src')
    }]
  }
};
