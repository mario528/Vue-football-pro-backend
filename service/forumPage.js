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
            DB.find('forumUser', {
                userName: userName
            }, (err, result1) => {
                getForumType().then((res_0) => {
                    listRemoveDuplication(res_0).then((res_1) => {
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
                                isFollower: isFollower,
                                suggest_forum_type: res_1
                            },
                            state: true
                        })
                        res.end();
                    })
                })
            })
        }
    })
})
const getForumType = function () {
    let typeList = []
    return new Promise((resolve, reject) => {
        DB._connectDB((err, client) => {
            let result = [];
            const db = client.db('vue-football');
            let cursor = db.collection('forum').find({}, {
                'forumTabs': 1
            });
            cursor.each((err, doc) => {
                if (err) {
                    console.log("查询失败");
                    reject(err)
                } else if (doc != null) {
                    result.push(doc)
                } else {
                    result.forEach((item) => {
                        typeList = typeList.concat(item.forumTabs)
                    })
                    resolve(typeList);
                }
            })
        })
    })
}
const listRemoveDuplication = function (array) {
    return new Promise((reslove, reject) => {
        var temp = [];
        var index = [];
        var l = array.length;
        for (var i = 0; i < l; i++) {
            for (var j = i + 1; j < l; j++) {
                if (array[i] === array[j]) {
                    i++;
                    j = i;
                }
            }
            temp.push(array[i]);
            index.push(i);
        }
        console.log(index);
        reslove(temp);
    })
}
module.exports = router;