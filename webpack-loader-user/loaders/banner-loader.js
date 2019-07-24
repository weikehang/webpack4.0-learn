//这个插件可以获取传入option
let loaderUtils = require("loader-utils");
//检验工具
let validateOptions = require("schema-utils");
//fs操作文件
let fs = require("fs");
function loader(source) {
    //添加异步
    let cb = this.async();
    //启用缓存loader,内容不改变的情况不再编译
    this.cacheable();
    //获取参数
    let options = loaderUtils.getOptions(this);
    //创建验证格式
    let schema = {
        type:"object",
        properties: {
            filename: {
                type: "string"
            },
            text: {
                type: "string"
            }
        }
    };
    //检验传进来的参数是否符合定义的格式
     validateOptions(schema, options, "banner-loader");
     //解构获取参数
    let {text,filename} = options;
    if (text){
        //如果转进来的string
        return JSON.stringify(text) + source
    }else if (filename) {
        //如果传进来的是文件，需要读文件的内容，然后写出去
        fs.readFile(filename,"utf8",(err,text)=>{
            cb(err, text + source);
        })
    }

}

module.exports = loader;