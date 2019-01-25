const express = require('express')
const crypto = require('crypto')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()

router.post('/login', (req, res) => {
    console.log("请求登陆接口")
    const md5 = crypto.createHash('md5');
    const username = req.body.username;
    const password=md5.update(req.body.password).digest('base64');
    DB.find('user', {
        'username': username
    }, (err, result) => {
        if (err) {
            console.log('数据查询失败')
        } else if (result.length == 0) {
            console.log('输入的用户名不存在')
            res.json({
                data:[
                    {
                        status: false,
                        state: 2
                    }
                ]
            })
            res.end()
        } else {
            if (result[0].password == password) {
                console.log('登陆成功')
                res.json({
                    data:[
                        {
                            status: false,
                            state: 1
                        }
                    ]
                })
                res.end()
            } else {
                res.json({
                    data:[
                        {
                            status: false,
                            state: -1
                        }
                    ]
                })
                console.log('密码错误!')
                res.end()
            }
        }
    })
})
module.exports = router