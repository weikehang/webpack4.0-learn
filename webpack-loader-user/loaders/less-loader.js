//引入less插件
let less = require("less");
//less-loader是负责编译css文件，style-loader是负责把css插入到head中
function loader(source) {
    //添加异步
    let cb = this.async();
    //this.resource 文件的地址
    //调用render将less转为css
    less.render(source, {filename: this.resource}, (err, output) => {
        cb(err, `module.exports = ${JSON.stringify(output.css)}`);
    });
}

module.exports = loader;