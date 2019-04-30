const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const crypto = require('crypto')
const router = express.Router()
router.post('/changeUserInfo', (req, res) => {
    const md5 = crypto.createHash('md5');
    const type = req.body.type;
    let jsonStr = undefined
    const userName = req.body.userName;
    let changeContent;
    let key;
   if (type == 0) {
        changeContent = md5.update(req.body.changeContent).digest('base64')
        jsonStr = {"password": changeContent}
    } else if (type == 1) {
        changeContent = req.body.changeContent
        jsonStr = {"phoneNumber": changeContent}
    } else if (type == 2) {
        changeContent = req.body.changeContent
        jsonStr = {"selfIntroduce": changeContent}
    } else if (type == 3) {
        changeContent = req.body.changeContent
        jsonStr = {"sex": changeContent}
    }
    console.log("type", type)
    console.log("修改的数据", key)
    console.log("修改的数据内容", changeContent)
    console.log("用户名", userName)
    DB.change('user',{
        "username": userName
    },{$set:jsonStr}, (err, result) => {
        if (err) {
            res.json({
                data: {
                    state: 0
                }
            });
            res.end();
        } else {
            res.json({
                data: {
                    state: 1
                }
            });
            res.end();
        }
    })

})
module.exports = router;