let path = require("path");

//定义的插件
class A {
    //apply是固定的格式
    apply(compiler) {
        //挂上每个钩子等待触发
        compiler.hooks.parse.tap("xxx", function () {
            console.log("parse")
        });
    }
}

class B {
    apply(compiler) {
        compiler.hooks.emitFile.tap("xxx",function () {
            console.log("emitFile")
        })
    }
}

module.exports = {
    mode:"development",
    entry:"./src/index.js",
    output:{
        filename:"bundle.js",
        path: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    path.resolve(__dirname, "loaders", "style-loader.js"),
                    path.resolve(__dirname, "loaders", "less-loader.js")
                ]
            }
        ]
    },
    plugins: [
        new A,
        new B
    ]
};