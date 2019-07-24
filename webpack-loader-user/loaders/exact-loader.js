//这个loader的作用是把css文件单独放置到一个文件中，然后通过页面中的link标签去引入
function loader(source) {
    //发射或者输入一个文件，这个文件的内容就是css文件的内容
    this.emitFile("main.css", source);
    //通过页面中的link标签去引入
    let style = `
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "main.css");
        document.head.appendChild(link);
    `;
    return style
}

module.exports = loader;