const express = require('express')
const homePage = require('./Crawler/homePage')
const router = express.Router()

router.get('/home',(req,res)=> {
    homePage.getHomepageBanner((err,result)=> {
        res.json({
            banner: result
        })
        res.end();
    })
})
module.exports = router;