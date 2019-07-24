const path = require("path");
const  webpack = require("webpack");
module.exports = {
    mode: "development",
    entry: {
        react:["react","react-dom","react-router-dom","jquery"]//将公共模块打包为一个独立的插件
    },
    output: {
        library: "react",//导出的内容添加到一个属性
        libraryTarget: "this",//将以什么样的方式导出：var exports commonjs等
        filename: "[name].dll.js"//导出插件的名称
    },
    plugins: [
        new webpack.DllPlugin({
            name: "react",//这个名称要跟library对应
            path: path.join(__dirname, "../dist/react.manifest.json")//导出列表清单，里面存着各种插件的路径，下次内容更新将不再被打包，可直接从manifest.json中获取
        })

    ]
};

