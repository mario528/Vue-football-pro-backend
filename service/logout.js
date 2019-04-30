const express = require('express')
const router = express.Router()
router.post('/logout',(req,res)=> {
    res.clearCookie('username');
    res.json({
        state: 200,
        msg: '登出成功'
    })
    res.end();
})
module.exports = router;