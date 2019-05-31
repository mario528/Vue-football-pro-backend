const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()
router.post('/forum/unfollow', (req, res) => {
    const userName = req.body.userName;
    const forumName = req.body.forumName;
    DB.change('forumUser', {
        'userName': userName
    }, {
        $pull: {
            "favForumList": forumName
        }
    }, (err, result) => {
        if (err) {
            res.json({
                status: false
            })
            res.end();
        } else {
            DB.change('forum', {
                "forumName": forumName
            }, {
                $inc: {
                    "forumFollowerNum": -1
                }
            }, (err, resu) => {
                if (err) {
                    res.json({
                        status: false
                    })
                    res.end();
                } else {
                    res.json({
                        status: true
                    })
                    res.end();
                }
            })
        }

    })
})
module.exports = router