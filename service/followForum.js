const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router();
router.post("/forum/join", (req, res) => {
    const joinUser = req.body.userName;
    const joinForum = req.body.forumName;
    DB.change('forumUser', {
        "userName": joinUser
    }, {
        $addToSet: {
            "favForumList": joinForum
        }
    }, (err, result) => {
        if (err) {
            res.json({
                data: {
                    status: false
                }
            })
            res.end();
        } else {
            DB.change('forum', {
                "forumName": joinForum
            }, {
                $inc: {
                    "forumFollowerNum": 1
                }
            }, (err, resu) => {
                if (err) {
                    res.json({
                        data: {
                            status: false
                        }
                    })
                    res.end();
                } else {
                    res.json({
                        data: {
                            status: true
                        }
                    })
                    res.end();
                }
            })
        }
    })

})
module.exports = router;