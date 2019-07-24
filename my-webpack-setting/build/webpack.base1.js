const path = require("path");
const  webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const AddAssetHtmlCdnWebpackPlugin  = require("add-asset-html-cdn-webpack-plugin");

module.exports = {
    entry: {
        index:"./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: '[name].js',
        chunkFilename: "[name].chunk.js"
    },
    performance: false,
    externals:{
      "jquery":"$"
    },
    resolve: {
        extensions: [".js",".jsx",".css",".less","json"],
        alias: {

        },
        mainFields: ["style", "main"]
    },
    module: {
        noParse:/jquery|lodash/,
        rules: [
            {
                test: /\.css$/,
                exclude:/node_modules/,
                include:path.resolve(__dirname,"../src"),
                use: [
                                       {
                        loader: "style-loader",
                        options: {
                            insertAt:"top"
                        }
                    },
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader:  "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    "less-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader",
                    "less-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(jpg|gif|png|svg|jpge|ico)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit:4096
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
            {
                test: /\.(html|htm)$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.jsx$/,
                use: ["@babel/preset-react"]
            }

        ]
    },
    plugins: [
       /* new webpack.DllPlugin({
            name: "_dll_[name]",
            path: path.join(__dirname, 'dist', '[name].manifest.json')
        }),
        new webpack.DllReferencePlugin({
            manifest: require("../build/dist/react.manifest.json")
        }),*/
       new webpack.ModuleConcatenationPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale/,/moment$/),
        new webpack.ProvidePlugin({
            "_": "lodash",
            "$": "jquery"
        }),
        new MiniCssExtractPlugin(),
        require("autoprefixer"),
        new HtmlWebpackPlugin({
            minify:{
                removeAttributeQuotes: true
            },
            template: "./index.html",
            hash: true,
            cache: true,
            chunks: ["index"]
        }),
        // new HtmlWebpackPlugin({
        //     minify:{
        //         removeAttributeQuotes: true
        //     },
        //     template: "./login.html",
        //     hash: true,
        //     cache: true,
        //     chunks: ["login"]
        // }),
        new AddAssetHtmlCdnWebpackPlugin(true,{
            jquery:'http://libs.baidu.com/jquery/2.0.0/jquery.min.js'
        }),
    ]
};

