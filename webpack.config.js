const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var  rootPath = path.resolve(__dirname, '.'); // 项目根目录
console.log('*****1')
console.log(path.resolve(__dirname,'./app/libs/jquery.min.js'))
console.log('*****2')
console.log(__dirname)
console.log('*****3')
console.log(path.join(rootPath, '/app/libs'))
module.exports = {
    devtool: 'eval-source-map',
    // entry: __dirname + "/app/main.js",
    entry: {index: __dirname + "/app/main.js",//已多次提及的唯一入口文件
        vendor: ['react', 'react-dom','jquery','openlayers']
    },
    output: {
        path: __dirname + "/build",
        // filename: "[name].[hash].js",
        filename: "[name].js",
        libraryTarget : 'var'
    },
    devServer: {
        contentBase: "./public",
        historyApiFallback: true,
        port: 3060,
        inline: true,
        hot: true
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.less'],
        alias: {
            jquery: path.resolve(__dirname,'./app/libs/jquery.min.js'),
            openlayers: path.resolve(__dirname,'./app/libs/ol.js')
            //openlayers: path.resolve(__dirname, '../node_modules/ol/dist/ol.js')
        },
    },
    externals: {
        'react': 'window.React'
    },
    module: {
        rules: [{
            test: /(\.jsx|\.js)$/,
            use: {
                loader: "babel-loader",
                // options: {
                //     presets: [
                //         "env", "react"
                //     ]
                // query: {compact: false}

                // }
            },
            exclude:[
                path.resolve(__dirname, "app/libs"),
                path.resolve(__dirname, "node_modules")
                ]
            // exclude: /node_modules/
        },
            // {
            //     test: require.resolve(path.resolve(__dirname,'./app/libs/jquery.min.js')),
            //     // use: [{
            //     //     loader: 'expose-loader',
            //     //     options: 'jQuery'
            //     // },{
            //     //     loader: 'expose-loader',
            //     //     options: '$'
            //     // }]
            //     //    path.resolve(__dirname, "app/libs"),
            //     loader: 'exports-loader?window.$!exports-loader?window.jQuery!script-loader'
            // },
            {
                test: /\.css$/,
                use: [{
                    loader: "style-loader",
                }, {
                    loader: "css-loader",
                    options: {
                        modules: false,
                       // localIdentName: '[name]__[local]--[hash:base64:5]'
                    }
                }
                    // , {
                    //     loader: "postcss-loader"
                    // }
                ]
            }
        ]
    },

    // externals: {
    //     jquery: 'window.jQuery', //或者jquery:'jQuery'
    //     $: 'window.jQuery',
    // },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            ol:'openlayers'
        }),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor','manifest'],
            minChunks: 'Infinity'
        }),


    ],
};
// console.log(exports);