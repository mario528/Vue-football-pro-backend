const superagent = require('superagent');
const cheerio = require('cheerio');
const DB = require('../model/database/mongoDB/Dao')
const baseUrl = 'https://www.dongqiudi.com/data?competition='
function getAllTeamInfo (competition) {
    let url = baseUrl + competition
    superagent.get(url).end((err,res)=> {
        let $ = cheerio.load(res.text);
        $('#stat_detail>.list_1>tbody>tr').each((idx,element)=> {
            let $a = cheerio.load(element)
            if(idx >= 2) {
                const regx = /\d+/;
                let teamName = $a('.team>a').text().replace(/\s+/g, "");
                let teamUrl = $a('.team>a').attr('href');
                let teamNum = regx.exec(teamUrl)[0]
                let teamIcon = $a('.team>a>img').attr('src');
                let teamType = '英冠'
                DB.insertOne('teamInfo',{
                    'teamName': teamName,
                    'teamType': teamType,
                    'teamNum': teamNum,
                    'teamIcon': teamIcon
                },(err,result)=> {

                })
            }
        })
    })
    return;
}
getAllTeamInfo(70)