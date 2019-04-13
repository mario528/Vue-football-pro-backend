const superagent = require('superagent');
const cheerio = require('cheerio');
const DB = require('../../model/database/mongoDB/Dao')
exports._crawlerFun = function (teamName,cb) {
    DB.find('teamInfo',{
        'teamName': teamName
    },(err,result)=> {
        const teamNum = result[0].teamNum;
        const baseURL = 'https://www.dongqiudi.com/team/'+ teamNum + 'html';
        superagent.get(baseURL).end((err,res)=> {
            const $ = cheerio.load(res.text);
            let honourList = [];
            $('.honour_record>.honour_list>.honour_item').each((index,element)=> {
                const $a = cheerio.load(element)
                let honourObj = {};
                let sessionList = []
                honourObj.title = $a('.honour_item_title>img').attr('src');
                honourObj.name = $a('.honour_item_title>.match_name').text();
                honourObj.times = $a('.honour_item_title>span:nth-child(3)').text();
                $a('.session_area>span').each((index,element)=> {
                    const $aa = cheerio.load(element)
                    let sessionItem = $aa('span').text();
                    sessionList.push(sessionItem)
                })
                honourObj.sessionList = sessionList;
                honourList.push(honourObj)
            })
            return honourList
        })
    })
}
