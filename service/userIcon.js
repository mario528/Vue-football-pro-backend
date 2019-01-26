const express = require('express')
const formidable = require('formidable')
const path = require('path')

const router = express.Router();
router.post('/loadUserIcon',(req,res)=> {
    console.log('请求上传头像接口')
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + '/upload');
    form.keepExtensions = true; // 保留后缀
    form.maxFieldsSize = 5 * 1024 * 1024;
    form.parse(req,(err,fields,files)=> {
        console.log(fields);
        console.log(files);
        if(err) {
            res.json({
                data: {
                    state: -1
                }
            })
        }
    })
})
module.exports = router;