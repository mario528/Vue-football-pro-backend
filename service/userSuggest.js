const async = require('async')
const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()
router.post('/user/suggest', (req, res) => {
    console.log("请求用户推荐接口")
    // 已登录 收藏->关注论坛的最火帖子
    // 未登录 最火论坛的最火帖子
    const userName = req.body.userName;
    const isLogin = userName == null ? false : true;
    if (isLogin) {
        var userPubLish;
        var hotSuggest;
        findUserCollectionList(userName).then((re) => {
            getAllContent(re).then((res3) => {
                userPubLish = res3;
                getHotForum().then((favourForumList) => {
                    const favourForumList_5 = favourForumList.slice(0, 5)
                    getUserJoinForum(userName).then((re_2) => {
                        forumNewPublish(re_2).then((res_suggest) => {
                            hotSuggest = res_suggest;
                            res.json({
                                data: {
                                    hotSuggest: hotSuggest,
                                    userPubLish: userPubLish
                                }
                            })
                            res.end()
                        })
                    })
                })
            })
        })

    } else {

    }
})
const findUserCollectionList = function (userName) {
    return new Promise((resolve, reject) => {
        DB.find('forumUser', {
            userName: userName
        }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                const forumCollection = res[0].forumCollection;
                resolve(forumCollection);
            }
        })
    })
}
const getAllContent = function (pageList) {
    const list = [];
    let index = 0;
    return new Promise((resolve, reject) => {
        if (pageList.length == 0) {
            resolve([]);
            return;
        }
        async.each(pageList, (item) => {
            getForumContent(item.forum_id).then((res) => {
                list.push(res[0])
                index++;
                if (index == pageList.length) {
                    resolve(list)
                }
            })
        })
    })
}
const getForumContent = function (forumId) {
    return new Promise((resolve, reject) => {
        DB.find('forum', {
            "invitation.forum_id": forumId,
        }, (err, res) => {
            if (err) {
                reject(err);
                return
            } else {
                const list = [];
                const forumReplyArray = res[0].invitation;
                forumReplyArray.forEach((ele, index) => {
                    if (ele.forum_id == forumId) {
                        list.push(ele)
                    }
                    if (index == forumReplyArray.length - 1) {
                        // console.log("(2)")
                        resolve(list)
                    }
                });
            }
        })
    })
};
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
const getUserJoinForum = function (userName) {
    return new Promise((resolve, reject) => {
        DB.find('forumUser', {
            'userName': userName
        }, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res[0].favForumList.slice(0, 5))
            }
        })
    })
}
const forumNewPublish = function (favForumList) {
    console.log(favForumList)
    const pageList = []
    let index = 0;
    return new Promise((resolve, reject) => {
        async.each(favForumList, (item) => {
            DB.find('forum', {
                'forumName': item
            }, (err, res) => {
                console.log("_______==========", res)
                if (res[0].invitation.length != 0) {
                    const data = res[0].invitation[0].content;
                    pageList.push(data)
                }
                if (index == favForumList.length - 1) {
                    resolve(pageList)
                }
                index++;
            })
        })
    })

}
module.exports = router;