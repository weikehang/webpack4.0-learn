const path = require("path");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const  webpackMerge = require("webpack-merge");
const  webpackBase = require("./webpack.base");

module.exports = webpackMerge(webpackBase,{
    mode: "development",
    devtool: "cheap-module-source-map",
    optimization: {
        minimizer: [
            //压缩js
            new UglifyJsPlugin({
                cache: true, //启用缓存
                parallel: true, //使用多线程打包
                sourceMap: true //生成sourceMap映射文件
            }),
            //压缩css
            new OptimizeCssAssetsWebpackPlugin({})
        ],
        //排除无用的es6模块
        usedExports:true
    },
    module: {
        //不编译jq lodash
        noParse:/jquery|lodash/
    },
    plugins: [
        //打包之前清空旧的文件
        new CleanWebpackPlugin(),
        //提取的css进行命名
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        //给文件添加注释
        new webpack.BannerPlugin("哈哈"),
        //拷贝静态文件
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, "../assets"),
            to: path.resolve(__dirname, "../dist/assets")
        }]),
        //模块分析工具
        new BundleAnalyzerPlugin()
    ]
});

