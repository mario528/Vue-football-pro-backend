const express = require('express')
const crypto = require('crypto')
const Identicon = require('identicon.js')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()

router.post('/register', (req, res) => {
    console.log("请求注册接口");
    const md5 = crypto.createHash('md5');
    const username = req.body.username;
    const password = md5.update(req.body.password).digest('base64');
    const telephone = req.body.telephone;
    // 生成与用户名相匹配的hash头像
    let md5_icon = crypto.createHash('md5');
    md5_icon.update(username);
    const imgData = new Identicon(md5_icon.digest('hex')).toString();
    let imgUrl = 'data:image/png;base64,' + imgData
    DB.insertOne('user', {
        'username': username,
        'password': password,
        'phoneNumber': telephone,
        'userImageUrl': imgUrl,
        "followers": [],
        'attention': []
    }, (err, result) => {
        if (err) {
            res.json({
                data: [{
                    status: false,
                    state: -1
                }]
            })
            res.end();
        } else {
            DB.insertOne('userInfomation', {
                'username': username,
                'isVip': false
            }, (err, result) => {})
            res.json([{
                status: false,
                state: 1,
                data: {
                    userIcon: imgUrl
                }
            }])
            res.end();
        }
    })
})
module.exports = router;