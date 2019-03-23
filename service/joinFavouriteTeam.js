const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router();
router.post('/team/favourite',(req,res)=> {
    console.log("请求加入球迷圈接口");
    const userName = req.body.userName;
    const teamName = req.body.teamName;
    console.log(userName,teamName)
    DB.change('userInfomation',{'username': userName},{$set:{'favouriteTeam': teamName}},(err,result)=> {
        if(err) {
            res.json({
               data: {
                  msg: '加入失败',
                  state: false
               }
            })
        }else {
            res.json({
                data: {
                   msg: '加入成功',
                   state: true
                }
             })
        }
    })

})
module.exports = router