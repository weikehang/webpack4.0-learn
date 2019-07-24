let loaderUtils = require("loader-utils");
let fs = require("fs");
function loader(source) {
    //解构参数
    let {layout, placeholder} = loaderUtils.getOptions(this);
    //添加异步
    let cb = this.async();
    //fs读取文件，然后替换内容
    fs.readFile(layout,"utf-8",function (err,data) {
        //把对应的内容替换成对应的文件 login home
        let r = data.replace(placeholder, source);
        cb(err, `module.exports = ${JSON.stringify(r)}`);
    })
}

loader.raw = true; //把文件转成二进制流

module.exports = loader;