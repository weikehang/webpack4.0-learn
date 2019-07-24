//获取参数的工具箱
let loaderUtils = require("loader-utils");
//获取文件标识
let mime = require("mime");
function loader(source) {
    //获取参数
    let options = loaderUtils.getOptions(this);
    //获取图片的类型
    const mimetype = mime.getType(this.resourcePath);
    //如果文件大小小于limit,则使用base64
    if (source.length < options.limit) {
        //组装base64
        let base64 = `data:${mimetype};base64,${source.toString('base64')}`;
        //最后必须修改文件的路径
        return `module.exports = ${JSON.stringify(base64)}`;
    }else{
        //使用file-loader
        return require("./file-loader.js");
    }
}

loader.raw = true; //把文件转成二进制流

module.exports = loader;