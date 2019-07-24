function loader(source) {
    console.log("inline-loader");
    return source
}

loader.pitch = function () {
    console.log("inline pitch")
};

module.exports = loader;