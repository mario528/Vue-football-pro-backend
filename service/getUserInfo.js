const express = require('express')
const router = express.Router();
const DB = require('../model/database/mongoDB/Dao')
router.post('/user/information', (req, res) => {
    console.log("请求用户信息接口")
    let infoList = [
        {
            title: '密码',
            type: 'password',
            placeholder: '请输入要修改的密码',
        },
        {
            title: '手机号',
            type: 'input',
            placeholder: '请输入要修改的手机号',
        },
        {
            title: '个人介绍',
            type: 'input',
            placeholder: '请输入个人介绍',
        },
        {
            title: '性别',
            type: 'choice'
        }
    ]
    const username = req.body.username;
    DB.find('user', {
        'username': username
    }, (err, result) => {
        console.log(infoList);
        res.json({
            data: {
                userInfo: result[0],
                infoList: infoList
            }
        })
    })
})
module.exports = router;