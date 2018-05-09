const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin");

var path = require('path');
var  rootPath = path.resolve(__dirname, '.'); // 项目根目录
console.log('*****1')
console.log(path)
console.log('*****2')
console.log(__dirname)
console.log('*****3')
console.log(path.join(rootPath, '/app/libs'))
module.exports = {
    devtool: 'eval-source-map',
    // entry: __dirname + "/app/main.js",
    entry: {index: __dirname + "/app/main.js",//已多次提及的唯一入口文件
        vendor: ['react', 'react-dom','libs2']
    },

    output: {
        path: __dirname + "/build",
        // filename: "bundle-[hash].js"
        // filename: "bundle.[chunkHash:8].js"
        filename: "[name].[chunkHash:8].js",
        publicPath: '',
        chunkFilename: "[name].[chunkHash:8].js",
    },
    devtool: 'none',
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,
        hot: true
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.less'],
        alias: {
            libs2: path.join(rootPath, './app/libs/jquery.min.js'),
        },
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,

                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: '[name]__[local]--[hash:base64:5]'
                        }
                    }, {
                        loader: "postcss-loader"
                    }],
                })
                // use: [
                //     {
                //         loader: "style-loader"
                //     }, {
                //         loader: "css-loader",
                //         options: {
                //             modules: true,
                //             localIdentName: '[name]__[local]--[hash:base64:5]'
                //
                //         }
                //     }, {
                //         loader: "postcss-loader"
                //     }
                // ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html",
            chunksSortMode: "dependency"
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),
        new CleanWebpackPlugin('build/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor','manifest'],
        }),
        new webpack.ProvidePlugin({
            $: "libs2",
            jQuery: "libs2"
        })
    ],
};