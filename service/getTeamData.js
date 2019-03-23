const express = require('express')
const router = express.Router();
const teamData = require('./Crawler/teamData')

router.post('/data/getTeamData', function (req, res) {
    console.log("BI请求球队数据模型接口")
    console.log(req.body.teamName)
    teamData.getTeamData(req.body.teamName, (err,result)=> {
        res.json(result)
        res.end();
    })
})
module.exports = router;