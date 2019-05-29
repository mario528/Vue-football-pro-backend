const express = require('express')
const router = express.Router();
const DB = require('../model/database/mongoDB/Dao')
router.post('/forum/forumPage', (req, res) => {
    const forumName = req.body.forumName;
    const pageId = req.body.pageId;
    const userName = req.body.userName;
    DB.find('forum', 
        {"forumName": forumName, "invitation.forum_id": pageId}
    , (err, result) => {
        console.log('---------------')
        DB.find('forumUser', {
            'userName':userName,
            'forumCollection.pageId': pageId
        },(err,res3)=> {
            if(err) return;
            let isCollection;
            res3.length != 0 ? isCollection = true : isCollection = false;
            result[0].invitation.forEach(element => {
                if(element.forum_id == pageId) {
                    res.json({
                        data: {
                            data: element,
                            isCollection: isCollection
                        }
                    })
                    res.end();
                }
            });
        })
    })
})
module.exports = router;