/*
 express.js: 引入 express 模块，设置路由
*/
var express = require('express')()
var {
    mongoose,
    User
} = require("./mongoose")

/*
 express.js: 配置引擎
*/
express.set('views', './views'); // 添加视图路径
express.engine('html', require('ejs').renderFile); // 将EJS模板映射至".html"文件
express.set('view engine', 'html'); // 设置视图引擎


/*
 express.js: 配置引擎
*/
express.get('/index', function (request, response) {
    response.render('index')
})

express.get("/addUser", function (request, response) {
    console.log(request.query.name)
    let data = {
        name: request.query.name
    }
    console.log(data)
    var addUser = new User(data)
    addUser.save(function (error, info) {
        if (error) {
            console.log(error);
            response.send(JSON.stringify(error))
        } else {
            response.send(JSON.stringify(info))
        }
    })
    // response.send(JSON.stringify(data))
})


express.get('/delUser', function (request, response) {
    let data = {
        name: request.query.name
    }
    User.findOneAndRemove(data, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('删除成功')
            response.send(JSON.stringify(info))
        }
    })
})

express.get('/list', function (request, response) {
    User.find(function (req, res) {
        response.send(JSON.stringify(res))
    })
})


express.get('/update', function (request, response) {
    let data = {
        oldValue: request.query.oldValue,
        newValue: request.query.newValue
    }
    console.log(data)
    // return
    User.updateOne({
        name: data.oldValue
    }, {
        name: data.newValue
    }, function (req, res) {
        response.send(JSON.stringify(res))
    })
})

express.get('/', function (request, response) { // 路由
    response.send("hello world!") // 传送HTTP响应
})
express.listen(3000) //监听3000端口，默认localhost: 127.0.0.1 || 0.0.0.0