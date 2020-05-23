/* 
  mongoose.js ：建立数据库连接
 */
var mongoose = require('mongoose') // 引入 mongoose
var url = "mongodb://localhost:27017/chat"; // 本地数据库地址
mongoose.connect(url)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Successful connection to " + url)
});

var Schema = mongoose.Schema 

let user = {
    name: String,
    password: String,
    headImg: String
}

var userSchema = Schema(user)
var User = mongoose.model('users', userSchema); //将schema编译为model构造函数


module.exports = {
    mongoose,
    User
}