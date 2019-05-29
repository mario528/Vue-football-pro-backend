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
// io.sockets.once('connection', (socket) => {
//     console.log('++++++++++用户Socket服务连接成功++++++++++')
//     const socketID = socket.id
//     global.socketID = socketID;
//     socket.on('sendMsg',(data)=> {
//         console.log(data)
//     })
// });
io.on('connection', function (socket) {
    console.log('++++++++++用户Socket服务连接成功++++++++++')
    const userSocket = socket
    global.socket = userSocket;
    socket.on('sendMsg', function (data) {
        let index;
        const userList = global.userList;
        console.log("++++++++++++++++++++++++++++++++")
        userList.forEach((element, idx) => {
            console.log("===============")
            if (data.to == Object.keys(element)[0]) {
                console.log(idx);
                index = idx
            }
        });
        const emitSocket = userList[index][data.to]
        emitSocket.emit('returnMsg', data.msg)
    })
})