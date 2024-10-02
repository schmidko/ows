const path = require('path');
const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

function webpackConfig(env, argv) {
	return {
		mode: 'development',
		devtool: 'eval-cheap-module-source-map',
		entry: {
			bundle: [
                'webpack-hot-middleware/client?noInfo=true',
				'./src/client/main.js',
			]
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
					include: path.resolve(__dirname, 'src'),
					use: ['html-loader'],
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
			symlinks: false,
			modules: ['node_modules', './src'],
		},
		plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshPlugin(),
            new webpack.NoEmitOnErrorsPlugin()],
	};
}

module.exports = webpackConfig();
