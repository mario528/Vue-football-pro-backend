const express = require('express')
const crypto = require('crypto')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()

router.post('/register', (req,res)=> {
    console.log("请求注册接口");
    const md5 = crypto.createHash('md5');
    const username = req.body.username;
    const password = md5.update(req.body.password).digest('base64');
    const telephone = req.body.telephone;
    console.log(username,password,telephone)
    DB.insertOne('user',
    {'username': username , 'password': password, 'phoneNumber': telephone },(err,result)=> {
        if(err) 
            console.log(err);
    })
})
module.exports = router;