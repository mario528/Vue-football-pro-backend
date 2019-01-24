const config = require('./mysql_config');
const mysql = require('mysql');

const _connect = function () {
    const connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    })
    connection.connect();
}