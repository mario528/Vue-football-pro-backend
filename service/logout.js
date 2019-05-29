const express = require('express')
const router = express.Router()
router.post('/logout',(req,res)=> {
    console.log("请求账号登出接口")
    const userName = req.body.userName;
    res.clearCookie('username');
    const userList = global.userList;
    const index = userList.forEach((element,index) => {
        console.log("===============")
        if(userName == Object.keys(element)[0]) {
            return index;
        }
    });
    userList.splice(index,1);
    res.json({
        state: 200,
        msg: '登出成功'
    })
    res.end();
})
module.exports = router;