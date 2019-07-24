function loader(source) {
    console.log("c");
    return source
}

loader.pitch = function () {
    console.log("c pitch")
};
module.exports = loader;