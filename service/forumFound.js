const express = require('express');
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router();
router.post('/forum/found', (req, res) => {
    console.log('请求创建论坛接口')
    const userName = req.body.foundBy;
    const userIcon = req.body.userIcon;
    const foundTime = new Date().toDateString().toString();
    const forumIcon = req.body.forumIcon;
    const forumName = req.body.forumName;
    const forumTabs = req.body.forumTabs;
    const forumIntroduce = req.body.forumIntroduce;
    const forumFollowerNum = 1;
    const forumFollowers = [{
        "userName": userName,
        "userIcon": userIcon
    }];
    const invitation = []
    DB.insertOne('forum', {
        'forumName': forumName,
        'foundTime': foundTime,
        "foundBy": userName,
        'forumFollowerNum': forumFollowerNum,
        "forumIcon": forumIcon,
        'forumFollowers': forumFollowers,
        "invitation": invitation,
        "forumTabs": forumTabs,
        "forumIntroduce": forumIntroduce
    }, (err, result) => {
        DB.change('forumUser',{
            "userName": userName
        },{$addToSet:{"favForumList": forumName}},(err,result2)=> {
            if (err) {
                res.json({
                    state: false
                })
                res.end();
            } else {
                res.json({
                    state: true
                })
                res.end();
            }
        })
    })
})
module.exports = router;