module.exports = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
        loader: 'babel-loader',
        options: {
          presets: ['react']
        }
      }]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    filename: './dist/bundle.js'
  },
  devServer: {
    contentBase: './dist'
  }
};