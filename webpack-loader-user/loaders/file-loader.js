//file-loader只是对文件进行复制移动到固定目录
loaderUtils = require("loader-utils");

function loader(source) {
    //interpolateName获取文件的hash值，并插入值,生成唯一的文件名
    let name = loaderUtils.interpolateName(this, "[hash:8].[ext]",{content:source});
    //发射文件，会在dist目录下面生成一个文件
    this.emitFile(name, source);
    //把原来的路径变成编译后的路径
    return `module.exports = '${name}'`;
}
loader.raw = true;//这样写辨识source是一个二进制
module.exports = loader;