const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router()
router.post('/forum/type', (req, res) => {
    console.log('请求搜索接口')
    let type = req.body.type
    console.log(type);
    const list = [];
    list.push(type)
    DB.find('forum', {
        "forumTabs": {
            $all: list
        }
    }, (err, res_2) => {
        console.log(res_2);
        getForumType().then((res_0) => {
            listRemoveDuplication(res_0).then((res_1) => {
                res.json({
                    data: {
                        forum_list: res_2,
                        type_list: res_1
                    }
                })
                res.end();
            })
        })

    })
})


const getForumType = function () {
    let typeList = []
    return new Promise((resolve, reject) => {
        DB._connectDB((err, client) => {
            let result = [];
            const db = client.db('vue-football');
            let cursor = db.collection('forum').find({}, {
                'forumTabs': 1
            });
            cursor.each((err, doc) => {
                if (err) {
                    console.log("查询失败");
                    reject(err)
                } else if (doc != null) {
                    result.push(doc)
                } else {
                    result.forEach((item) => {
                        typeList = typeList.concat(item.forumTabs)
                    })
                    resolve(typeList);
                }
            })
        })
    })
}
const listRemoveDuplication = function (array) {
    return new Promise((reslove, reject) => {
        var temp = [];
        var index = [];
        var l = array.length;
        for (var i = 0; i < l; i++) {
            for (var j = i + 1; j < l; j++) {
                if (array[i] === array[j]) {
                    i++;
                    j = i;
                }
            }
            temp.push(array[i]);
            index.push(i);
        }
        console.log(index);
        reslove(temp);
    })
}
module.exports = router;