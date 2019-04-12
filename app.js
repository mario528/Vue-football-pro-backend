const express = require('express')
const route = require('./service/index')
const bodyParser = require("body-parser");
const cookieParase = require('cookie-parser')
// const Cookies = require('cookies');
const log4js = require('log4js')
const app = express();
const signStr = 'xadsafeowirw'

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(cookieParase(signStr));
//设置cookie
// app.use(function(req,res,next){
// 	req.Cookies = new Cookies(req,res);
// 	req.userInfo = {}; 
// 	if(req.Cookies.get('userInfo')){
// 		try{
// 			req.userInfo = JSON.parse(req.cookies.get('userInfo'));
// 		}catch(e){}
// 	}
// 	next();
// })


route(app)
app.listen(3000, () => {
    console.log("----------服务器启动成功----------")
});