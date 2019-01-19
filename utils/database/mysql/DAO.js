const config = require('./config')
const mysql = require('mysql')
// const connection = mysql.createConnection({
//     host: config.host,
//     user: config.user,
//     password: config.password,
//     port: config.port
// })
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password
});
pool.getConnection(function (err, connection) {
    if(err) {
        throw new Error('数据库链接失败')
    }
});
