const express = require('express')
const homePage = require('./Crawler/homePage')
const router = express.Router()

router.get('/home',(req,res)=> {
    homePage.getHomepageBanner((err,result)=> {
        homePage.getHotMatch((err,re) => {
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