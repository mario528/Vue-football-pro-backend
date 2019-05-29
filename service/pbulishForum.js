const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const nodeUuid = require('node-uuid')
const router = express.Router();
router.post('/forum/publish', (req, res) => {
    const userName = req.body.userName;
    const userIcon = req.body.userIcon;
    const forumName = req.body.forumName;
    const forumTitle = req.body.forumTitle;
    const forumContent = req.body.forumContent;
    const type = req.body.type;
    const time = getTimeDate()
    const forum_id = nodeUuid.v1();
    DB.change('forum', {
        'forumName': forumName
    }, {
        $addToSet: {
            "invitation": {
                "forum_id": forum_id,
                "content":[{
                    "jordansw": userName,
                    "userIcon": userIcon,
                    "forumTitle": forumTitle,
                    "forumContent": forumContent,
                    "type": type,
                    "time": time,
                    'forumName': forumName
                }]
            }
        }
    },(err,result)=> {
        initUserPublish(userName,{
            "forum_id":forum_id
        },()=> {
            if(err) {
                res.json({
                    data: {
                        state: false
                    }
                });
                res.end();
            }else {
                res.json({
                    data: {
                        state: true
                    }
                });
                res.end();
            }
        })
    })
})
const getTimeDate = function () {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const second = new Date().getSeconds();
    const str = year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒";
    return str
}
const initUserPublish = function (userName,publishObj,cb) {
    DB.change('userForumPublish',{
        "userName": userName
    },{
        $addToSet: {
            'publish': publishObj
        }
    },(err,result)=> {
        if(err) {
            return;
        }
        cb();
    })
};
module.exports = router