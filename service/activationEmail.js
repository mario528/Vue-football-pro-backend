const express = require('express')
const Redis = require('ioredis');
const router = express.Router();
const Email = require('../model/Email/email')
// const redis = new Redis()
router.post('/user/activationEmail', (req, res) => {
    const email = req.body.email;
    const userName = req.body.userName;
    const type = req.body.type; // 0 获取激活码 1 激活
    console.log("_____________"+type)
    if(type == '0') {
        console.log("获取激活码")
        const code = Math.floor(Math.random()*1000000);
        res.json({
            state: 0,
            code: code
        });
        res.end();
    }else {
        console.log("检验激活码");
        const cbCode = req.body.cbCode;
        redis.get(userName,(err,res)=> {
            if(cbCode == res) {
                console.log("注册成功");
                res.json({
                    state: 1
                });
                res.end();
            }
        })
    }
})
module.exports = router;