// 步骤1,服务端
const webSocket = require('ws'); //引入ws服务器模块
const ws = new webSocket.Server({
    port: 8000
}); //创建服务器,端口为8000
let clients = {}
let clientNum = 0
ws.on('connection', (client) => { //连接客户端

    //给客户端编号,也就是参与聊天的用户
    // client.name = ++clientNum;

    // clients[client.name] = client;
    // 用户的聊天信息
    client.on('message', (msg) => {
        let userMsg = JSON.parse(msg)
        let {
            uuid,
            userName,
            message
        } = userMsg
        client.name = userName;
        clients[client.name] = client;
        console.log('用户' + client.name + '说:' + msg)
        if (message) {
            //广播数据发送输出
            broadcast(client, message)
        } else {
            // 通知上线
            noticeOnline(client)
        }
    })
    //报错信息
    client.on('error', (err => {
        if (err) {
            console.log(err)
        }
    }))
    // 下线信息
    client.on('close', () => {
        let userList = Object.keys(clients)
        delete clients[client.name];
        console.log('用户' + client.name + '下线了~~')
        for (var key in clients) {
            // clients[key].send('用户' + client.name + '说：' + msg)
            clients[key].send(JSON.stringify({
                userName: client.name,
                msg: client.name + '下线了',
                msgType: 'notice',
                userList: userList
            }))
        }
    })
})

//广播方法
function broadcast(client, msg) {
    let userList = Object.keys(clients)
    console.log('当前在线用户', userList)
    // for (var key in clients) {
    // clients[key].send('用户' + client.name + '说：' + msg)
    //给所有用户发消息
    // clients[key].send(JSON.stringify({
    //     userName: client.name,
    //     msg: msg,
    //     msgType: 'msg',
    //     userList: userList
    // }))
    //给某个用户发消息
    // }
    let receiverName = client.name == 'user1' ? 'test2' : 'user1'
    clients[receiverName].send(JSON.stringify({
        userName: client.name,
        msg: msg,
        msgType: 'msg',
        userList: userList
    }))
}


//通知当前用户上线
function noticeOnline(client) {
    let userList = Object.keys(clients)
    clients[client.name].send(JSON.stringify({
        msg: "你上线了",
        userList: userList,
        msgType: 'notice'
    }))
    let receiverName = client.name == 'user1' ? 'test2' : 'user1'
    noticeOtherUserSomeOneIsOnline(client, receiverName, userList)
}

//通知其他用户某用户上线
function noticeOtherUserSomeOneIsOnline(currentUser, otherUser, userList) {
    if (clients[otherUser]) {
        clients[otherUser].send(JSON.stringify({
            msg: currentUser.name + "上线了",
            userList: userList,
            msgType: 'notice'
        }))
    }
}