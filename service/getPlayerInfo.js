const express = require('express');
const router = express.Router();
const playerData = require('./Crawler/playerInfo')
router.post('/data/player',(req,res) => {
    const playerName = req.body.playerName;
    console.log('请求球员数据接口');
    playerData.getPlayerInfo(playerName,function(err,result) {
        console.log("-----------------",result)
        if(err) {
            res.json({
                state: false,
                msg: '查询失败'
            })
            res.end();
        }else {
            res.json({
                result
            })
            res.end();
        }
    })
})
module.exports = router;