const express = require('express')
const homePage = require('./Crawler/homePage')
const router = express.Router()
const DB = require('../model/database/mongoDB/Dao')
const User = require('./Util/User')
router.get('/home', (req, res) => {
    console.log("请求首页接口")
    console.log(global.userList)
    if (req.cookies.username) {
        console.log("_________+++++++++++++")
        const username = req.cookies.username;
        global.userList.push({
            username:[global.socketID]
        })
        DB.find('user', {
            "username": username
        }, (err, res1) => {
            homePage.getHomepageBanner((err, result) => {
                homePage.getHotMatch((err, re) => {
                        res.json({
                            data: {
                                banner: result,
                                hotMathch: re,
                                userInfo: {
                                    username: res1[0].username,
                                    userImageUrl: res1[0].userImageUrl
                                }
                            },
                            status: true
                        })
                        res.end();
                })
            })
        })
    } else {
        homePage.getHomepageBanner((err, result) => {
            homePage.getHotMatch((err, re) => {
                res.json({
                    data: {
                        banner: result,
                        hotMathch: re
                    },
                    status: true
                })
                res.end();
            })
        })
    }

})
module.exports = router;