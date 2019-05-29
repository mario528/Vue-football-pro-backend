const express = require('express')
const homePage = require('./Crawler/homePage')
const router = express.Router()
const DB = require('../model/database/mongoDB/Dao')
const User = require('./Util/User')
const async = require('async')
router.post('/user/userCenter', (req, res) => {
    console.log("请求用户主页接口")
    const username = req.body.username;
    const type = req.body.type;
    DB.find('user', {
        "username": username
    }, (err, res1) => {
        const data = res1[0]
        if (type == 0) {
            findUserPublishList(username).then((res2) => {
                getAllContent(res2).then((res3) => {
                    res.json({
                        userInfo: {
                            username: data.username,
                            userImageUrl: data.userImageUrl,
                            selfIntroduce: data.selfIntroduce,
                            followersNum: data.followers.length,
                            attentionNum: data.attention.length,
                            userPubLish: res3
                        }
                    })
                    res.end()
                })
            })
        }else if(type == 1) {
            findUserCollectionList(username).then((re)=> {
                getAllContent(re).then((res3) => {
                    res.json({
                        userInfo: {
                            username: data.username,
                            selfIntroduce: data.selfIntroduce,
                            followersNum: data.followers.length,
                            attentionNum: data.attention.length,
                            userPubLish: res3
                        }
                    })
                    res.end()
                })
            })
        }
    })
})
const findUserPublishList = function (userName) {
    return new Promise((resolve, reject) => {
        DB.find('userForumPublish', {
            userName: userName
        }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                const publishList = res[0].publish;
                resolve(publishList);
            }
        })
    })
}
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
const forumIcon = function (forumName) {
    DB.find('forum', {
        'forumName': forumName
    }, (err, res) => {
        console.log(res[0].forumIcon);
    })
}
module.exports = router;