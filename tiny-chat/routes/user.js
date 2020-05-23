const express = require('express')
const router = express.Router()
const ObjectID = require('mongodb').ObjectID;
const {
    sendJson,
    throwError
} = require('../common/function')
const {
    mongoose,
    User
} = require("../db/mongo.conf")


const checkUserExit = function (params) {
    return new Promise(function (resolve, reject) {
        User.findOne(params, function (error, res) {
            resolve(res)
        })
    })
}

//注册
router.post('/register', function (request, response) {
    let params = request.body
    const user = new User(params)
    checkUserExit({
        name: params.name
    }).then(res => {
        if (res) {
            response.send(sendJson(0, '用户名已存在'))
        } else {
            user.save(function (error, res) {
                if (error) {
                    response.send(throwError())
                } else {
                    response.send(sendJson(1, '注册成功'))
                }
            })
        }
    })
})


//登录
router.post('/login', function (request, response) {
    let params = request.body
    User.findOne({
        name: params.name
    }, function (error, res) {
        if (!res) {
            response.send(sendJson(0, '用户不存在'))
        } else {
            if (params.password != res.password) {
                response.send(sendJson(0, '用户名或密码错误'))
            } else {
                response.send(sendJson(1, '用户验证成功',params))
            }
        }
    })
})


module.exports = router