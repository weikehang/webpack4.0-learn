function loader(source) {
    let code = `let style = document.createElement("style")
                style.innerHtml = ${JSON.stringify(source)}
                document.head.appendChild(style);
    `;
    return code.replace(/\\/g, "\\\\");

}

module.exports = loader;