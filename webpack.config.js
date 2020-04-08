const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},

	devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },

  module: {
    rules: [
      { test: /\.(js|jsx)$/,  use: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.styl$/, use: [ 'style-loader', 'css-loader','stylus-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(gif|png|jpe)$/, use: {loader: 'file-loader', options: {name: 'img/[hash].[ext]'}}}
    ]
  },

  resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			components: path.resolve(__dirname, 'src', 'components'),
			pages: path.resolve(__dirname, 'src', 'pages'),
			actions: path.resolve(__dirname, 'src', 'actions'),
			redusers: path.resolve(__dirname, 'src', 'redusers'),
		}
  }
};