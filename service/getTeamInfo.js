const express = require('express')
const router = express.Router();
const teamInfo = require('./Crawler/teamInfo')

router.post('/data/getTeamInfo', function (req, res) {
    console.log("请求球队数据接口")
    console.log(req.body.teamName)
    teamInfo.getTeamData(req.body.teamName, (err,result)=> {
        res.json(result)
        res.end();
    })
})
module.exports = router;