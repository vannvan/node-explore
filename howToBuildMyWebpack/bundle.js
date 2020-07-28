const fs = require('fs')
const parser = require('@babel/parser')
const path = require('path')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')


const getModuleInfo = (file) => {
    const body = fs.readFileSync(file, 'utf-8')

    const ast = parser.parse(body, {
        sourceType: 'module', //表示解析ES模块
    })
    // console.log(ast.program.body)

    const deps = {}

    traverse(ast, {
        ImportDeclaration({ node }) {
            const dirname = path.dirname(file)
            const abspath = './' + path.join(dirname, node.source.value)
            deps[node.source.value] = abspath
        }
    })

    const { code } = babel.transformFromAst(ast, null, {
        presets: ['@babel/preset-env']
    })
    const moduleInfo = { file, deps, code }
    return moduleInfo
}



const parseModules = (file) => {
    const entry = getModuleInfo(file)
    const temp = [entry]
    const depsGraph = {} //新增代码
    for (let i = 0; i < temp.length; i++) {
        const deps = temp[i].deps
        if (deps) {
            for (const key in deps) {
                if (deps.hasOwnProperty(key)) {
                    temp.push(getModuleInfo(deps[key]))
                }
            }
        }
    }
    // 新增代码
    temp.forEach(moduleInfo=>{
        depsGraph[moduleInfo.file] = {
            deps:moduleInfo.deps,
            code:moduleInfo.code
        }
    })
    console.log(depsGraph)
    return depsGraph
}

parseModules('./src/index.js')
























/**
 * 1. 通过fs原生获取模块内容 
 * 2. 通过@babel/parser将模块内容解析成AST语法树
 * 3. 通过@babel/traverse收集依赖，将import语句引入的文件收集起来
 * 4. 通过@babel/core @babel/preset-env将es6转为es5
 * 
 *
 */