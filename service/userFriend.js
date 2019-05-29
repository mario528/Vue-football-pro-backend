const async = require('async')
const DB = require('../model/database/mongoDB/Dao')
const express = require('express')
const router = express.Router()
router.post('/user/friend',(req,res)=> {
    const that = this;
    const userName = req.body.userName;
    const type = req.body.type;
    getUserFriendList(userName,type).then((res_inner1)=> {
        const friendList = type == 0 ? res_inner1.attention : res_inner1.followers;
        getUserDetail(friendList).then((res_inner2)=> {
            res.json({
                state: true,
                data: {
                    friendList: res_inner2
                }
            })
            res.end();
        })
    })
})
const getUserFriendList = function (userName) {
    return new Promise((resolve,reject)=> {
        DB.find('user',{
            'username': userName
        },(err,res)=> {
            if(err) {
                reject(err)
            }else {
                resolve(res[0])
            }
        })
    })
};
const getUserDetail = function (resList) {
    const userList = []; 
    let index = 0;
    return new Promise((resolve,reject)=> {
        async.each(resList,(item)=> {
            DB.find('user',{
                'username': item
            },(err,res)=> {
                index++
                userList.push(res[0])
                if(index == resList.length) {
                    resolve(userList)
                }
            })
        })
    })
}
module.exports = router;