function loader(source) {
    console.log("a");
    return source
}

loader.pitch = function () {
    console.log("a pitch")
};

module.exports = loader;