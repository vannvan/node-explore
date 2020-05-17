var express = require('express');
var expressWs = require('express-ws');
const _cookie = require('cookie');

var router = express.Router();
expressWs(router);

var chatInfo = {}
router
    .ws('/chat', function (ws, req) {
        let wsUserId = null
        ws.on('message', function (message) {
            var userMsg = JSON.parse(message)
            getOnlineUserList()
            if (userMsg.type == 'userInfo') {
                console.log('用户信息', userMsg)
                let uuid = userMsg.uuid.toString()
                chatInfo[uuid] = userMsg.userName
                // console.log(chatInfo)
                ws.send(JSON.stringify({
                    msg: '连接成功',
                    userInfo: userMsg.userName,
                    userList: chatInfo
                }))

            }
            if (userMsg.type == 'msg') {
                console.log('用户的消息', userMsg)
                ws.send(JSON.stringify(userMsg))
            }
        })
    })


//获取当前在线的用户
function getOnlineUserList() {
    console.log('当前在线用户', chatInfo)
    return chatInfo
}

//获取当前在线用户
router.post('/get-online', function (req, res) {
    res.send(JSON.stringify(chatInfo))
})


module.exports = router;