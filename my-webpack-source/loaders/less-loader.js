let less = require("less");
function loader(source) {
  let css;
  less.render(source, function (err,r) {
    css = r.css;
  });
  //最后的loader应该返回一个js执行的脚本
  return css;
}

module.exports = loader;