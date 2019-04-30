/*
 * @Author: majiaao
 * @LastEditors: majiaao
 * @Description: file content
 * @Date: 2019-04-13 00:37:29
 * @LastEditTime: 2019-04-17 11:11:19
 */
const nodemailer = require('nodemailer')
const config = require('./config')
exports.main = async function (sendEmailStr,subject,text,code) {
    let transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: true, 
        auth: {
          user: config.email.user, 
          pass: config.email.pass
        }
      });
      let info = await transporter.sendMail({
        from: config.email.user,
        to: sendEmailStr,
        subject: subject,
        text: text,
        html: `<a>${code}<a>`
      });
      transporter.sendMail(info, (error, result) => {
        if (error) {
            return console.log(error);
        }
       console.log(result);
       console.log('邮件发送成功')
    });
}
