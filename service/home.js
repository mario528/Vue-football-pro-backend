const express = require('express')
const homePage = require('./Crawler/homePage')
const router = express.Router()
const User = require('./Util/User')
router.get('/home', (req, res) => {
    if (req.cookies.username) {
        var username = req.cookies.username;
    }
    homePage.getHomepageBanner((err, result) => {
        homePage.getHotMatch((err, re) => {
            console.log(username)
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
})
module.exports = router;