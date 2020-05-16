const express = require('express')
const router = express.Router()
const ObjectID = require('mongodb').ObjectID;
const {
    mongoose,
    User
} = require("../mongoose")

//查询
router.post('/list', function (request, response) {
    let {
        current_page,
        per_size
    } = request.body

    let userModel = User.find({}).skip(parseInt(current_page-1)*parseInt(per_size)).limit(parseInt(per_size))
    User.find({}, function (allError, allRes) {
        let allLen = allRes.length
        console.log(allLen)
        userModel.exec({}, function (error, res) {
            console.log(res)
            response.send(JSON.stringify({
                total_size: allLen,
                data: res
            }))
            // response.send(JSON.stringify(res))
        })
    })

})

//新增
router.get("/addUser", function (request, response) {
    let data = {
        name: request.query.name
    }
    var addUser = new User(data)
    addUser.save(function (error, info) {
        if (error) {
            console.log(error);
            response.send(JSON.stringify(error))
        } else {
            response.send(JSON.stringify(info))
        }
    })
})

//删除
router.get('/delUser', function (request, response) {
    let data = {
        _id: ObjectID(request.query.id)
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


//更新
router.get('/update', function (request, response) {
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

module.exports = router