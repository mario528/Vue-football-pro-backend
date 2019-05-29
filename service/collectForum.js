const express = require('express');
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router();
router.post('/forum/collection', (req, res) => {
    console.log('请求收藏帖子接口')
    const userName = req.body.userName;
    const forumInfo = {
        forumName: req.body.forumName,
        forum_id: req.body.pageId,
    }
    DB.change('forumUser', {
        'userName': userName
    }, {
        $addToSet: {
            forumCollection: forumInfo
        }
    }, (err, result) => {
        if(err) {

        }else {
            res.json({
                state: true
            })
        }
    })
})
module.exports = router;