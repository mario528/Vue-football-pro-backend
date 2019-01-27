const express = require('express')
const formidable = require('formidable')
const DB = require('../model/database/mongoDB/Dao')
const path = require('path')
const fs = require('fs')
const router = express.Router();

// const multipartMiddleware = connectMultiparty();
router.post('/loadUserIcon',(req,res)=> {
    console.log('请求上传头像接口')
    const that = this;
    const userName = req.body.userName
    const form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + '/upload');
    form.keepExtensions = true; // 保留后缀
    form.maxFieldsSize = 5 * 1024 * 1024;
    form.parse(req,(err,fields,files)=> {
        const filePath = files.file.path
        const userName = fields.userName
        if(err) {
            res.json({
                data: {
                    state: -1,
                }
            })
            res.end();
        } else {
            fs.readFile(filePath,(err,data)=> {
                DB.change('user',{'username': userName},{$set:{'userImageUrl':"data:image/png;base64,"+data.toString('base64')}},(err,result)=>{
                    res.json({
                        data: {
                            state: 1,
                            userIcon: data.toString('base64')
                        }
                    })
                    res.end();
                })
            })
        }
    })
})
module.exports = router;