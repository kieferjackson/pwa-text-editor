const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

module.exports = () => {
	return {
		mode: 'development',
		entry: {
			main: './src/js/index.js',
			install: './src/js/install.js'
		},
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
		},
		plugins: 
		[ 
			new HtmlWebpackPlugin({ template: './index.html', title: 'Webpack Plugin' }),
			new InjectManifest({ swSrc: './src-sw.js', swDest: 'src-sw.js' }),
			new MiniCssExtractPlugin(),
			new GenerateSW(),
			// Manifest Settings
			new WebpackPwaManifest({
				name: 'Text Editor',
				short_name: 'TxtEdit',
				description: 'Progressive Web Application for text editing.',
				background_color: '#ffffff',
				crossorigin: 'use-credentials',
				icons:
				[
					{
						src: path.resolve('src/images/logo.png'),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join('assets', 'icons')
					}
				]
			})
		],

		module:
		{ 
			rules: 
			[
				{
					test: /\.css$/i,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: 
					{ 
						loader: 'babel-loader', 
						options: 
						{ 
							presets: ['@babel/preset-env'],
							plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
						} 
					}
				}
			] 
		},
	};
};
