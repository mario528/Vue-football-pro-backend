const Url = require('./mongodb_config')
const MongoClient = require('mongodb').MongoClient

const _connectDB = function (callback) {
    const url = Url.path;
    if (typeof url != 'string') throw new Error('传入的数据库地址有误')
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {
        callback(err, client);
    })
}
exports._connectDB = _connectDB
exports.insertOne = function (collectionName, json, callback) {
    _connectDB((err, client) => {
        if (err) throw new Error('数据库链接失败')
        console.log('MongoDB数据库链接成功')
        const db = client.db('vue-football');
        db.collection(collectionName).insertOne(json, (err, result) => {
            callback(err, result)
        })
    })
}
// 删除数据
exports.deleteObj = function (collectionName, json, status, callback) {
    _connectDB((err, client) => {
        if (err) throw new Error('数据库链接失败')
        console.log('MongoDB数据库链接成功')
        const db = client.db('vue-football');
        if (status == true) {
            db.collection(collectionName).deleteMany(json, (err, result) => {
                callback(err, result)
            })
        } else {
            db.collection(collectionName).deleteOne(json, (err, result) => {
                callback(err, result);
            })
        }
    })
}
// 修改数据
exports.change = function (collectionName, json1, json2, callback) {
    _connectDB((err, client) => {
        if (err) throw new Error('数据库链接失败')
        console.log('MongoDB数据库链接成功')
        const db = client.db('vue-football');
        db.collection(collectionName).update(json1, json2, (err, result) => {
            callback(err, result);
        })
    })
}
// 查询数据
exports.find = function (collectionName, json, callback) {
    _connectDB((err, client) => {
        let result = [];
        const db = client.db('vue-football');
        let cursor = db.collection(collectionName).find(json);
        cursor.each((err,doc)=> {
            if(err) {
                console.log("查询失败");
                callback(err,null);
                return;
            }else if(doc != null) {
                result.push(doc)
            } else {
                callback(null,result);
            }
        })
    })
}