let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode:"development",
    entry: "./src/index.js",
    output: {
        filename:"bundle.js"
    },
    //配置loader
    resolveLoader:  {
        //1、配置默认先去node_modules下面找loader,找不到再来loaders下面找
        modules: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "loaders")],
        //2、给自定义loader加上别名
        alias: {
            b:path.resolve(__dirname,"loaders/b.js")
        }
    },
    //loader的特点，功能单一，组合使用 style-loader less-loader css-loader loader不能有状态
    module:{
        rules:[//loader的类型 pre + normal + inline + post
            {
                exclude:/node_modules/,
                test:/\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets:["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use: {
                    loader: "banner-loader",
                    options: {
                        filename:"./loaders/banner.js"
                    }
                }
            },
            {
                test: /\.less$/,
                exclude:/node_modules/,
                use: ["style-loader","exact-loader","less-loader"]
            },
            {
                test: /\.(png|jpg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit:200*1024*1024
                    }
                },
            },
            {
                test: /\.html$/,
                use: {
                    loader: "html-layout-loader",
                    options: {
                        layout:path.join(__dirname,"./src","layout.html"),
                        placeholder:"{{__content__}}"
                    }
                }
            }

        ]
    },
    plugins:[
        /*new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./template/index.html"
        })*/
        new HtmlWebpackPlugin({
            template: "./src/login.html",
            filename: "login.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/home.html",
            filename: "home.html"
        })
    ]
};