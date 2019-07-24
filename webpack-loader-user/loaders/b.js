function loader(source) {
    console.log("b");
    return source
}

loader.pitch = function () {
    console.log("b pitch")
};

module.exports = loader;