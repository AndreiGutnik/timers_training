const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
	return {
		mode: env.mode ?? 'development',

		devServer: {
			port: 3000,
			open: true
		},

		entry: path.resolve(__dirname, 'src', 'App.tsx'),

		output: {
			path: path.resolve(__dirname, 'dist'),
		},

		plugins: [new HtmlWebpackPlugin({template: 'public/index.html',})],
		module: {
			rules: [
				{
					test: /\.tsx$/,
					exclude: path.resolve(__dirname, 'node_modules'),
					use: {
						loader: 'ts-loader',

					},
				},
			],
		},
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
		},
	}
};