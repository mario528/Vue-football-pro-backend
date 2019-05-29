const express = require('express')
const crypto = require('crypto')
const nodeUuid = require('node-uuid')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()
router.post('/forum/search', (req, res) => {
    console.log('请求论坛搜索接口');
    const searchQuery = req.body.search_query;
    const reg = new RegExp(searchQuery, 'i')
    if(searchQuery == '') {
        res.json({
            msg: 'no message',
            searchRes: [{
                value: '暂无该球迷圈'
            }],
            status: false
        })
        res.end();
        return;
    }
    console.log(searchQuery)
    DB.find('forum', {
        $or: [{
            'forumName': {
                $regex: reg
            }
        }]
    }, (err, result) => {
        console.log(result)
        if (result.length == 0) {
            // 数据库中没有数据
            res.json({
                msg: 'no message',
                searchRes: [{
                    forumName: '暂无该球迷圈'
                }],
                status: false
            })
            res.end();
        } else {
            res.json({
                searchRes: result
            })
            res.end();
        }
    })
});
module.exports = router;