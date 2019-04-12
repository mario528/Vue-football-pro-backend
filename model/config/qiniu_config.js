const fs = require('fs')
const qn = require('qn')
// 马加奥
// 自己封装的七牛云上传类 使用方式
// const qnObj = new QiniuFun('ma.jpg','/majiaao.jpg');
// const qnClient = qnObj.createClient();
// qnObj.uploadFile(qnClient,(err,res)=> {
//  if(err) {
//       console.log(err);
//       return
//   }
//   return res.url;
// })
const config = {
    accessKey: 'MG0UOT8CqKWERRL5WCnwirnfDfclONsfnxx3NMPp',
    secretKey: 'pktFqmlNSQ06Z25vlws1GzBEqqM7zOXPz3TmA8-p',
    bucket: 'vuefootball_ma',
    origin: 'http://pp8fmv8dr.bkt.clouddn.com'
}
function QiniuFun (path, fileName) {
    this.fileName = fileName;
    this.path = path;
}
QiniuFun.prototype.createClient = function () {
    const client = qn.create({
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        bucket: config.bucket,
        origin: config.origin
    });
    return client;
}
QiniuFun.prototype.uploadFile = function (client,callback) {
    client.uploadFile(this.path,{
        key: `/avatar/${this.fileName}`
    },(err,res)=> {
        if(err) {
            console.log(err,null);
        }else {
            callback(null,res.url)
        }
    })
}
module.exports = QiniuFun;