let path = require("path");
let fs = require("fs");
let babylon = require("babylon");
let traverse = require("@babel/traverse").default;
let generator = require("@babel/generator").default;
let {SyncHook} = require("tapable");


class Compiler {
    constructor(config) {
        //获取根目录 运行命令的位置
        this.root = process.cwd();
        //获取用户配置
        this.config = config;
        //入口文件
        this.entry = config.entry;
        //入口
        this.entryId = "";
        //所有依赖关系
        this.modules = {};

        this.hooks = {
            entryOption:new SyncHook(["compiler"]), //接收到入口选项的时候
            emitFile:new SyncHook(["compiler"]), //发射文件的时候
            parse:new SyncHook(["compiler"]) //解析文件的时候
        };

        //实行所有插件
        config.plugins.forEach(instance=>{
            instance.apply(this);
        })
    }

    //解析函数
    parser(source,parentDir){
        // 解析source  src 解析成为抽象语法树
        let ast = babylon.parse(source);
        //保存依赖
        let dependencies = [];
        //遍历语法树
        traverse(ast,{ // visitor
            //修改require和文件路径
            CallExpression(p){
                // 匹配所有的调用表达式
                let node = p.node;
                if(node.callee.name === 'require'){
                    //如果遇到require,将它转为__webpack_require__
                    node.callee.name = '__webpack_require__';
                    // 增加一个后缀名 .js
                    node.arguments[0].value = path.extname(node.arguments[0].value)?node.arguments[0].value:node.arguments[0].value+'.js';
                    // ./src/util/b.js  修改文件的路径
                    node.arguments[0].value = './'+path.join(parentDir,node.arguments[0].value);
                    //将每个依赖文件保存起来
                    dependencies.push(node.arguments[0].value);
                }
            }
        });
        //生成树
        let r = generator(ast);
        //当解析文件完成的时候，我就出发parser钩子函数
        this.hooks.parse.call(this);
        //返回代码和依赖
        return {r:r.code,dependencies}

    }

    创建依赖函数
    buildModule(modulePath,isMain){
        // /usr/local/work
        // /usr/local/work/src/index.js 获取到相对路径
        let relativePath = './'+path.relative(this.root,modulePath); // src/index
        //获取父路径
        let parentDir = path.dirname(relativePath); // src
        //获取文件内容
        let source = this.getSource(modulePath);

        // ast 抽象语法树 esprima traverse         generator
        // @babel/core  babylon @babel/traverse  @babel/generator
        if(isMain){
            this.entryId = relativePath; // 我们当前的主模块 标记为主模块入口
        }
        //解析内容
        let {r,dependencies} = this.parser(source,parentDir);

        //添加依赖图谱 {key:value}
        this.modules[relativePath] = r;
        //遍历依赖数组，对每个依赖一一解析
        dependencies.forEach(dep=>{ // ./src/util/b.js
            this.buildModule(path.join(this.root,dep));
        });
    }

    //获取文件内容函数
    getSource(modulePath) {
        //根据路径读取文件中的内容
        let source = fs.readFileSync(modulePath, "utf8");

        //根据loader，对内容进行比配
        let rules = this.config.module.rules;
        //遍历loader，对比配的文件进行内容转换
        for (let i = 0; i < rules.length; i++) {
            let {test: reg, use} = rules[i];
            //通过文件后缀名进行比配test的规则 找到需要替换的文件
            if(reg.test(modulePath)) {
                //取出最后一个loader
                let len = rules.length;
                function normalLoader() {
                    let loader = use[len--];
                    if(loader){
                        //引入对应的loader
                        let loaderCurrent = require(loader);
                        //转换完成第一loader，进行下一个loader
                        source = loaderCurrent(source);
                        normalLoader();
                    }
                }

                normalLoader();
            }
        }
        return source;
    }

    //发射文件函数
    emitFile() {
        //引入模板
        let ejs = require("ejs");
        //获取模板内容
        let templateStr = this.getSource(path.resolve(__dirname, "./ejs.ejs"));
        //替换内容
        let str = ejs.render(templateStr,{
            entryId:this.entryId,
            modules:this.modules
        });

        let {filename,path:p} = this.config.output;
        //可能内容有很多，可以将文件名和对应的内容放入对象，然后遍历处理
        this.assets = {
            [filename]: str
        };

        Object.keys(this.assets).forEach(key => {
            //将内容写入文件
            fs.writeFileSync(path.join(p,key),this.assets[key]);
        });

        //当 我发射文件的时候，我就触发emiFile钩子函数
        this.hooks.emitFile.call(this);

    }

    run() {
        //创建模块 {key,value}
        this.buildModule(path.join(this.root,this.entry), true);
        //发射文件
        this.emitFile();
    }
}

module.exports = Compiler;

