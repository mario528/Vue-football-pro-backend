const svgCaptcha = require('svg-captcha');
const express = require('express')
const router = express.Router()
router.get('/user/getVerificationCode',(req,res)=> {
    console.log('请求验证码接口')
    const codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 4, // 干扰线条的数量
        height: 44 
    }
    const captcha = svgCaptcha.create(codeConfig);
    res.json({
        data: {
            svgText: captcha.text,
            svgUrl: captcha.data
        }
    })
    res.end();
})
module.exports = router