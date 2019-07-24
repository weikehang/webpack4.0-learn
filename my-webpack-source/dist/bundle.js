(function(modules) {
    var installedModules = {};
  
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      });
  
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
  
      module.l = true;
  
      return module.exports;
    }
    return __webpack_require__((__webpack_require__.s = "./src\index.js"));
  })({
    
      "./src\index.js": function(module, exports, __webpack_require__) {
        eval(
          `const b = __webpack_require__("./src\\utils\\b.js");

const index = __webpack_require__("./src\\index.less");`
        );
      },
    
      "./src\utils\b.js": function(module, exports, __webpack_require__) {
        eval(
          `let a = __webpack_require__("./src\\utils\\a.js");`
        );
      },
    
      "./src\utils\a.js": function(module, exports, __webpack_require__) {
        eval(
          `console.log("sss");`
        );
      },
    
      "./src\index.less": function(module, exports, __webpack_require__) {
        eval(
          `let style = document.createElement("style");
style.innerHtml = "body {\\n  background: darkgray;\\n}\\nbody div {\\n  color: red;\\n}\\n";
document.head.appendChild(style);`
        );
      },
    
  });
  // 需要把所有用到的模块依赖 做成一个对象 key就是当前的文件名
  // require ->__webpack_require__
  // 需要改造引用的路径
  // 确定入口文件 加载内容
  
  // 创建依赖图谱 把所有的依赖做成列表
  // 把模板 和 我们解析出来的列表 进行渲染 打包到目标文件中