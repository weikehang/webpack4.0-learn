const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackDevConfig = require("../build/webpack.dev.config");

const compiler = webpack(webpackDevConfig);

const app = express();

app.use(
    webpackDevMiddleware(compiler,{
        // webpack-dev-middleware options
    })
);

app.get("/user",function (req,res) {
    res.send("jhhh")
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
});