const express = require('express');
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router();
router.post('/user/attention', (req, res) => {
    console.log('请求关注接口')
    const followerName = req.body.followerName;
    const beFollowedName = req.body.beFollowedName;
    DB.change('user', {
        "username": beFollowedName
    }, {
        $addToSet: {
            'attention': followerName
        }
    }, (err, res1) => {
        if(err) {
            return;
        }else {
            DB.change('user', {
                "username": followerName
            }, {
                $addToSet: {
                    'followers': beFollowedName
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