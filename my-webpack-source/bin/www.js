#! /usr/bin/env node

// commander - yarns
//获取文件路径
let path = require("path");
let configPath = path.resolve("webpack.config.js");
let config = require(configPath);

let Compiler = require("../src/Compiler");

//创建Compiler实例
let compiler = new Compiler(config);

//开始打包
compiler.run();
