const express = require('express')
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
const DB = require('../model/database/mongoDB/Dao')
router.post('/forum/forumPage', (req, res) => {
    const forumName = req.body.forumName;
    const pageId = req.body.pageId;
    console.log(forumName,pageId)
    DB.find('forum', 
        // "invitation": {$elemMatch: {'forum_id': pageId}},
        // "forumName": forumName
        {"forumName": forumName, "invitation.forum_id": pageId}
    , (err, result) => {
        console.log('---------------')
        console.log(result)
        result[0].invitation.forEach(element => {
            if(element.forum_id == pageId) {
                res.json({
                    data: {
                        data: element
                    }
                })
                res.end();
            }
        });
    })
})
module.exports = router;