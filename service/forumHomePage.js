const express = require('express')
const crypto = require('crypto')
const nodeUuid = require('node-uuid')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()
router.post('/forum/home', (req, res) => {
    console.log('请求论坛首页接口');
    const userName = req.body.userName;
    DB.find('forumUser', {
        'userName': userName
    }, (err, result) => {
        if (result.length == 0) {
            // 数据库中没有数据
            const user_id = nodeUuid.v1();
            DB.insertOne('forumUser', {
                'userName': userName,
                'user_id': user_id,
                'favForumList': []
            }, (err, result) => {
                DB.insertOne('userForumPublish',{
                    'userName': userName,
                    'publish': [],
                    'reply': []
                },(err,result3)=> {
                    res.json({
                        status: 1
                    })
                    res.end();
                })
            });
        } else {
            res.json({
                status: true,
                data: {
                    userInfo: {
                        favForumList: result[0].favForumList == undefined ? [] : result[0].favForumList
                    }
                }
            })
            res.end();
        }
    })
});
module.exports = router;