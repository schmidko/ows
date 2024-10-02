const path = require('path');
const webpack = require('webpack');

function webpackConfig(env, argv) {
	return {
		mode: 'production',
		devtool: 'eval-cheap-module-source-map',
		entry: {
			bundle: './src/client/main.js'
		},
		output: {
			path: path.resolve(__dirname, 'public/static'),
			filename: '[name].js',
			publicPath: '/static/',
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					include: path.resolve(__dirname, 'src'),
					use: {
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react']
						}
					}
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: 'html-loader',
						},
					],
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					loader: 'file-loader',
				},
				{
					test: /\.css|scss$/,
					use: ['style-loader', 'css-loader', 'postcss-loader'],
				},
			],
		},
		resolve: {
			modules: ['node_modules', './src'],
		}
	};
}

module.exports = webpackConfig();
