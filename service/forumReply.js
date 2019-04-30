const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()
router.post('/forum/reply',(req,res)=> {
    console.log("请求回复帖子接口")
    let forumReplyContent;
    const pageId = req.body.pageId;
    const forumContent = req.body.forumContent;
    const jordansw = req.body.jordansw;
    const userIcon = req.body.userIcon;
    const type = req.body.type;
    const content = {
        jordansw: jordansw,
        userIcon: userIcon,
        forumContent: forumContent,
        type: type,
        time: new Date().toDateString().toString()
    }
    DB.find('forum',{
        "invitation.forum_id": pageId
    },(err,result1)=> {
        const forumReplyArray = result1[0].invitation
        forumReplyArray.forEach((element) => {
            if(element.forum_id == pageId) {
                forumReplyContent = element.content;
                forumReplyContent.push(content)
            }
        });
        DB.change('forum',{
            "invitation.forum_id": pageId
        },{
            $addToSet: {'invitation.$.content': content}
        },(err,result2) => {
            res.json({
                status: true
            })
            res.end();
        })
    })
})

module.exports = router;