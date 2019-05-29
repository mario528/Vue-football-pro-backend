const Redis = require('ioredis');
const redis = Redis(6379, '127.0.0.1');  
module.exports = redis;