const express = require('express')
const route = require('./service/index')
const bodyParser = require("body-parser");
const cookieParase = require('cookie-parser')
const socketIO = require('socket.io');
const app = express();
global.userList = []
const signStr = 'xadsafeowirw'

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParase(signStr));

route(app)
const server = app.listen(3000, () => {
    console.log("----------服务器启动成功----------")
});
const io = socketIO.listen(server);
io.sockets.once('connection', (socket) => {
    console.log('++++++++++用户连接成功++++++++++')
    const socketID = socket.id
    global.socketID = socketID
});