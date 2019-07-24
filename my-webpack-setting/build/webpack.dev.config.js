const path = require("path");
const  webpack = require("webpack");
//合拼插件
const  webpackMerge = require("webpack-merge");
//获取基本配置
const  webpackBase = require("./webpack.base");

//合并配置
module.exports = webpackMerge(webpackBase, {
    mode: "development",//开发模式
    devtool:"cheap-module-eval-source-map", //编译代码模式
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'), //告诉服务器从哪里读取文件
        host: "localhost", //ip
        port: 8089,//端口
        compress: true,
        open: true, //自动打开浏览器
        hot:true  //热更新
    },
    plugins: [
        //开启热更新插件
        new webpack.HotModuleReplacementPlugin(),
        //定义全局变量
        new webpack.DefinePlugin({
            env: "'development'"
        })
    ]
});

