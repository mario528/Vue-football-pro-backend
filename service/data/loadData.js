const teamList = ["巴黎圣日耳曼", "里尔", "里昂", "圣埃蒂安", "蒙彼利埃", "斯特拉斯堡", "兰斯", "尼斯", "雷恩", "马赛", "尼姆", "波尔多", "昂热", "图卢兹", "南特", "第戎", "卡昂", "摩纳哥", "亚眠", "甘冈"]
const DB = require('../../model/database/mongoDB/Dao')
teamList.forEach(element => {
    DB.insertOne('team',{name:element,'type':'法甲球队'},(err,res)=> {
        if(err) {
            console.log(element+ '插入失败')
        }
    })
});
