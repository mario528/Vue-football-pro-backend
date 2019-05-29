const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()
router.post('/search', (req, res) => {
    console.log('请求搜索接口')
    let searchQuery = req.body.searchQuery
    const reg = new RegExp(searchQuery, 'i')
    DB.find('team', {
        $or: [{
            "name": {
                $regex: reg
            }
        }]
    }, (err, result) => {
        if (err) {
            throw new Error('查询失败')
        }
        if (result.length != 0 && searchQuery != undefined && searchQuery != '') {
            res.json({
                team: result
            })
            res.end();
        }
    })
})
module.exports = router;