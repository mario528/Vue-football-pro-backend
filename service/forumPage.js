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
            const data = result[0]
            const foundBy = data.foundBy;
            const forumFollowerNum = data.forumFollowerNum;
            const forumFollowers = data.forumFollowers;
            const invitation = data.invitation;
            const forumIcon = data.forumIcon;
            const forumTabs = data.forumTabs;
            const forumIntroduce = data.forumIntroduce
            let isFollower;
            DB.find('forumUser',{userName: userName},(err,result1)=> {
                result1[0].favForumList.indexOf(forumName) == -1 ? isFollower = false : isFollower = true
                res.json({
                    data: {
                        forumInfo: {
                            forumFollowerNum: forumFollowerNum,
                            forumFollowers: forumFollowers,
                            foundBy: foundBy,
                            forumIcon: forumIcon,
                            forumTabs: forumTabs,
                            forumIntroduce: forumIntroduce
                        },
                        invitation: invitation,
                        isFollower: isFollower
                    },
                    state: true
                })
                res.end();
            })
        }
    })
})
module.exports = router;