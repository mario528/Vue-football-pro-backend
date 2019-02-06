const express = require('express')
const route = require('./service/index')
const bodyParser = require("body-parser");
const cookieParase = require('cookie-parser')
const cookies = require('cookies');
const app = express();

app.use((req, res, next) => {
    req.cookies = new cookies(req, res)
    req.userInfo = {};
    if(req.cookies.get('userInfo')) {
        req.userInfo = JSON.parse(req.cookies.get('userInfo'))
    }
    next();
})
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParase());

route(app)
app.listen(3000, () => {
    console.log("----------服务器启动成功----------")
});