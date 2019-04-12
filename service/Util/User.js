const DB = require('../../model/database/mongoDB/Dao')
const User = function () {
}
User.prototype.getUserIconUrl = function (userName,callback) {
    DB.find('user',{
        'username': userName
    },(err,result)=> {
       if(err) callback(err,null)
       callback(null,result[0].userImageUrl)
    })
}
module.exports = User