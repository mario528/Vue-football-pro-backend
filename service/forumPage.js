const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()
router.post('/forum/forumHome', (req, res) => {
    console.log("请求论坛主页接口")
    const forumName = req.body.forumName;
    const userName = req.body.userName;
    DB.find('forum', {
        'forumName': forumName
    }, (err, result) => {
        if (err || result.length == 0) {
            res.json({
                state: false
            })
            res.end();
        } else {
            const foundBy = result[0].foundBy;
            const forumFollowerNum = result[0].forumFollowerNum;
            const forumFollowers = result[0].forumFollowers;
            const invitation = result[0].invitation;
            res.json({
                data: {
                    forumInfo: {
                        forumFollowerNum: forumFollowerNum,
                        forumFollowers: forumFollowers,
                        foundBy: foundBy
                    },
                    invitation: invitation,
                },
                state: true
            })
            res.end();
        }
    })
})
module.exports = router;