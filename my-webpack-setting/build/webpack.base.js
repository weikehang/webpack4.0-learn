const path = require("path");
const webpack = require("webpack");
//生成html插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
//自动添加cdn链接到html
const AddAssetHtmlCdnWebpackPlugin = require("add-asset-html-cdn-webpack-plugin");
//自动添加静态文件到html中的插件
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin");


module.exports = {
    entry: {
        main: "./src/main.js" //主入口文件
    },
    output: {
        filename: "bundle.js",//同步代码
        chunkFilename: "[name].bundle.js"//异步代码
    },
    optimization: {
        splitChunks:{
            chunks:"all",//同步异步都要处理
            minSize: 0,
            minChunks: 1,
            cacheGroups:{
                vendor:{//抽离第三方公共模块
                    test:/node_modules/,
                    automaticNameDelimiter: "~",
                    priority: 20 //设置优先级
                },
                default:{//默认使用default
                    minChunks: 1,
                    priority: -20
                }
            }
        }
       /* splitChunks:{
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors:{
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }

        }*/
    },
    performance: false, //关闭性能警告
    externals: {
        "jquery": "$" //打包的时候忽略第三方
    },
    resolve: {
        extensions: [".js", ".jsx", ".css", ".less", "json"],//自动添加扩展名，在文件可以不用谢后缀
        alias: {//别名，可以简化路径
          "_c":path.resolve(__dirname,"../src","components")
        },
        mainFields: ["style", "main"] //引入第三方的时候，有时候读取文件的顺序可以改变比如bootstrap
    },
    module: {
        noParse: /jquery|lodash/, //不编译jquery等
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, "../src"),
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            insertAt: "top" //最新的css放在最顶端
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2 //引入less、postcss
                        }
                    },
                    "less-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                exclude:/node_modules/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            insertAt: "top" //最新的css放在最顶端
                        }
                    },
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(jpg|gif|png|svg|jpge|ico)$/,
                exclude:/node_modules/,
                include:path.resolve(__dirname,"../src"),
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 4096
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            //处理在index.html中引入图片
            {
                test: /\.(html|htm)$/,
                exclude:/node_modules/,
                include:path.resolve(__dirname,"../src"),
                use: 'html-withimg-loader'
            },
            //转换js的loader
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude:/node_modules/,
                include:path.resolve(__dirname,"../src"),
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }), //生成html模板，默认输出到dist目录
        //moment默认将所有文件打包到locale，引入时文件太大，可以将其忽略，在文件使用到啥就引入啥
        new webpack.IgnorePlugin(/^\.\/locale/, /moment$/),
        //在每个文件都注入了$等，便于直接引用，不需要导入文件
        new webpack.ProvidePlugin({
            "_": "lodash",
            "$": "jQuery"
        }),
        require("autoprefixer"),
        /* new AddAssetHtmlCdnWebpackPlugin(true,{
             jquery:'http://libs.baidu.com/jquery/2.0.0/jquery.min.js'
         }),*/
        //引用manifest.json列表清单
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, "../dist", "react.manifest.json")
        }),
        //将dll文件自动注入到index.html中，暴露react属性，文中可以全局获取
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, "../dist", "react.dll.js")
        })
    ]
};

