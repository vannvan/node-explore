/* 
  mongoose.js ：建立数据库连接
 */
var mongoose = require('mongoose') // 引入 mongoose
var url = "mongodb://localhost:27017/shop"; // 本地数据库地址
mongoose.connect(url)

// connect() 返回一个状态待定（pending）的连接，可以用来判断连接成功或失败
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Successful connection to "+url)
});

var Schema = mongoose.Schema //schema 都会映射到一个 MongoDB collection

let user = {
  name:String
}

var userSchema = Schema(user)
var User = mongoose.model('users', userSchema); //将schema编译为model构造函数

// var newUser = new User({name: "yyyyyyyyyyyy"})// Mongoose 会自动找到名称是 model 名字复数形式的 collection
// newUser.save()


module.exports = {mongoose,User}