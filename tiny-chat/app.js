/*
 express.js: 引入 express 模块，设置路由
*/
const express = require('express')
const app = express()
const glob = require("glob");
require('./routes/chats')
// const expressWs = require('express-ws');
// const bodyParser = require('body-parser');
const {
    resolve
} = require('path');

const userRouter = require('./routes/user')
// const chatRouter = require('./routes/chats')

/*
 express.js: 配置引擎
*/
app.set('views', './views'); // 添加视图路径
app.engine('html', require('ejs').renderFile); // 将EJS模板映射至".html"文件
app.set('view engine', 'html'); // 设置视图引擎


/*
 express.js: 配置引擎
*/
glob.sync(resolve('./views', "**/*.html")).forEach((item, i) => {
    let htmlRelativePath = item.split('/views')[1]
    let pagePath = htmlRelativePath.replace('.html', '')
    app.get(pagePath, function (request, response) {
        let viewPath = pagePath.replace('/', '')
        response.render(viewPath)
    })
})





app.use(express.json()) 
app.use(express.urlencoded({
    extended: true
})) 



app.use('/', userRouter)
// app.use('/', chatRouter)

//重定向到首页
app.get('/', function (req, res) {
    res.redirect('/index');
});


app.listen(3000) //监听3000端口，默认localhost: 127.0.0.1 || 0.0.0.0

console.log('服务已启动')