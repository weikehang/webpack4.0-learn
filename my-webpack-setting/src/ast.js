let code = `import _,{} from 'lodash'`;
// import join from 'lodash/join'
// import _ from 'lodash'

// babel-import


let babel = require('@babel/core');
let t = require('@babel/types');
let babelImport = {
    visitor:{
        ImportDeclaration(path){
            let node = path.node;
            if(!(node.specifiers.length === 1 && t.isImportDefaultSpecifier(node.specifiers[0]))){
                let specifiers = node.specifiers.map(specifier=>{
                    if(t.isImportDefault(specifier)){
                        return t.importDeclaration([specifier])
                    }else{
                        return t.importDeclaration([specifier])
                    }
                });
                path.replaceWithMultiple(specifiers)
            }
        }
    }
}
let r = babel.transform(code,{
    plugins:[
        babelImport
    ]
})
console.log(r.code)

