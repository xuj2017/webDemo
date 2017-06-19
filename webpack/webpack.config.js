var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
	//页面入口文件配置
	entry: {
		index: ['./src/js/index.js', './src/js/test.js']
	},
	//入口文件输出配置
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, "build")
	},
	module: //加载器配置
	{
		loaders: [
			{
				test:/\.js$/,
				exclude: /node_modules/,
				include:/src/,
				loader: "babel-loader",
        		options: {
					presets: ["es2015"]
				},
			},
			{ //不编译图片文件
				test: /\.(png|jpg|gif)$/,
				exclude: /node_modules/,
				include:/src/,
				loader: 'file-loader?limit=100&name=img/[hash:10].[ext]',
			},
			 { //css文件合并
				test: /\.css$/,
				exclude: /node_modules/,
				include:/src/,
				loader: ExtractTextPlugin.extract({ fallback: "style-loader",use: "css-loader"})
             }, 
			{ 
				test: /\.scss$/,
				exclude: /node_modules/,
				include:/src/,
				loader: ExtractTextPlugin.extract({ fallback:"style-loader", use: "css-loader!sass-loader"})
			},
			{
	　　　　　　 test: /\.html$/,
				exclude: /node_modules/,
	　　　　　　 loader: 'html-loader'
	　　　　}
		]
	},
	plugins: [
		new ExtractTextPlugin("./css/[name].module.css"),
		new HtmlWebpackPlugin({
			filename:'index.html',
			template:'index.html',
			inject:'body'
		})
		
	],
};