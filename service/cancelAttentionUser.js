const express = require('express');
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router();
router.post('/user/cancelAttention', (req, res) => {
    console.log('请求取消关注接口')
    const username = req.body.username;
    const friendName = req.body.friendName;
    DB.change('user', {
        "username": username
    }, {
        $pull: {
            "attention":friendName
        }
    }, (err, res1) => {
        if(err) {
            return;
        }else {
            DB.change('user', {
                "username": friendName
            }, {
                $pull: {
                    "followers":username
                }
            }, (err, res2) => {
                if(err) {
                    return;
                }else {
                    res.json({
                        state: true
                    })
                    res.end();
                }
            })
        }
    })
})
module.exports = router;