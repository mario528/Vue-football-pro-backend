const express = require('express')
const router = express.Router();
const DB = require('../model/database/mongoDB/Dao')
router.post('/user/information',(req,res)=> {
    console.log("请求用户信息接口")
    let infoList = [
        {
          title: '用户名',
          type: 'input',
          placeholder: '请输入用户名',
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
    DB.find('userInfomation',{
        'username': username
    },(err,result)=> {
        console.log(infoList)
        res.json({
            data: {
                infoList: infoList
            }
        })
    })
})
module.exports = router;