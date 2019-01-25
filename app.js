const express = require('express')
const route =require('./service/index')
const bodyParser = require("body-parser");
const cookieParase = require('cookie-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParase());

route(app)
app.listen(3000,()=> {
    console.log("----------服务器启动成功----------")
});