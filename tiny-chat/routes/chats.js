// 步骤1,服务端
const webSocket = require('ws'); //引入ws服务器模块
const ws = new webSocket.Server({
    port: 8000
}); //创建服务器,端口为8000

const {
    JSONToString,
    getTime
} = require('../common/function')
let clients = {} //记录当前用户信息
let userList = [] //当前在线用户标识列表


const onlineOrOffLineNoticeMsg = function (receiver, isOnline) {
    return {
        receiver: receiver,
        msgType: 'notice',
        message: isOnline ? receiver + '上线了' : receiver + '下线了',
        timestamp: getTime()
    }
}
ws.on('connection', (client) => { //连接客户端
    // 用户上线
    client.on('message', (msg) => {
        let userMsg = JSON.parse(msg)
        let {
            sender,
            receiver,
            message
        } = userMsg
        client.name = sender;
        Observer(client)
        if (message) {
            //数据发送输出
            sendMessageToClient(sender, receiver, message)
        } else {
            // 通知上线
            noticeOnlineOrOffLine(sender, true)
        }
    })
    //报错信息
    client.on('error', (err => {
        if (err) {
            console.log(err)
            //还没想好做哪些处理
        }
    }))
    // 下线信息
    client.on('close', () => {
        console.log('用户' + client.name + '关闭了消息服务')
        noticeOnlineOrOffLine(client.name, false)
    })
})

/**
 * 这里Observer主要是为了后面扩展其他需要及时响应的方法
 */
const Observer = function (client) {
    clients[client.name] = client;
    userList = Object.keys(clients)
}

//发送消息
/**
 * 
 * @param {*String} sender 
 * @param {*String} receiver 
 * @param {*Object} message 
 * @param {*Boolean} isOnline 
 */
const sendMessageToClient = function (sender, receiver, message) {
    let messageInfo = {
        sender: sender,
        message: message,
        msgType: "message",
        timestamp: getTime(),
        userList: userList
    }
    //如果接收方在线，则执行发送
    if (receiver) {
        messageInfo.receiver = receiver
        clients[receiver].send(JSONToString(messageInfo))
    }
    clients[sender].send(JSONToString(messageInfo))
    console.log('向客户端发送消息', JSONToString(messageInfo))
    //暂时先不考虑sender/receiver是否在线的情况，因为后面会将消息存进mongo
}

/**
 * 
 * @param {*String} currentUser
 * @param {*Boolean} isOnline  
 */
const noticeOnlineOrOffLine = function (currentUser, isOnline) {
    for (var key in clients) {
        //上/下线需要更新其他用户的好友列表
        let noticeUserMessage = {}
        let exceptCurrentUserList = userList.filter(el => el != currentUser)
        noticeUserMessage = Object.assign(onlineOrOffLineNoticeMsg(key, isOnline), {
            userList: isOnline ? userList : exceptCurrentUserList
        })
        let isOnlineMsg = isOnline ? '上线' : '下线'
        console.log('用户:' + currentUser + isOnlineMsg + '，消息:' + JSONToString(noticeUserMessage))
        clients[key].send(JSONToString(noticeUserMessage))
    }
    if (!isOnline) {
        delete clients[currentUser];
    }
}