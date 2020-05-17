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
        delete clients[client.name];
        console.log('用户' + client.name + '下线了~~')
    })
})

//广播方法
function broadcast(client, msg) {
    let userList = Object.keys(clients)
    console.log('当前在线用户', userList)
    for (var key in clients) {
        // clients[key].send('用户' + client.name + '说：' + msg)
        clients[key].send(JSON.stringify({
            userName: client.name,
            msg: msg,
            userList: userList
        }))

    }
}


//通知当前用户上线
function noticeOnline(client) {
    let userList = Object.keys(clients)
    clients[client.name].send(JSON.stringify({
        msg: "你上线了",
        userList: userList
    }))
}