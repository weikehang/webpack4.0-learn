let loaderUtils = require("loader-utils");
//style-loader是接收less-loader过来的内容进行解析
function loader(source) {
    //组装成style格式的css
    let style = (`
        let style = document.createElement("style");
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `);
    return style;
}

//request是文件的请求路径,创建style标签，动态添加到head
loader.pitch = function (request) {
    let style = `
        var style = document.createElement("style");
        style.innerHTML = require(${loaderUtils.stringifyRequest(this, "!!" + request)});
        document.head.appendChild(style);
    `;
    return style;
};

module.exports = loader;