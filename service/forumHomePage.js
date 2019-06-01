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
                DB.insertOne('userForumPublish', {
                    'userName': userName,
                    'publish': [],
                    'reply': []
                }, (err, result3) => {
                    getHotForum().then((resList) => {
                        res.json({
                            status: 1,
                            data: {
                                banner: [
                                    'http://psdme4dz2.bkt.clouddn.com/team_flag.jpg',
                                    'http://psdme4dz2.bkt.clouddn.com/team.jpg'
                                ],
                                forumList: resList.slice(0, 10)
                            }
                        })
                        res.end();
                    })
                })
            });
        } else {
            getHotForum().then((resList) => {
                res.json({
                    status: true,
                    data: {
                        userInfo: {
                            favForumList: result[0].favForumList == undefined ? [] : result[0].favForumList
                        },
                        forumList: resList.slice(0, 10),
                        banner: [
                            'http://psdme4dz2.bkt.clouddn.com/team_flag.jpg',
                            'http://psdme4dz2.bkt.clouddn.com/team.jpg'
                        ]
                    }
                })
                res.end();
            })
        }
    })
});
const getHotForum = function () {
    return new Promise((resolve, reject) => {
        DB._connectDB((err, client) => {
            let result = [];
            const db = client.db('vue-football');
            let cursor = db.collection('forum').find().sort({
                forumFollowerNum: -1
            });
            cursor.each((err, doc) => {
                if (err) {
                    console.log("查询失败");
                    reject(err)
                } else if (doc != null) {
                    result.push(doc)
                } else {
                    resolve(result);
                }
            })
        })
    })
}
module.exports = router;