const superagent = require('superagent');
const cheerio = require('cheerio');
const DB = require('../../model/database/mongoDB/Dao')
const getPlayerNum = function (teamName) {
    const reg = new RegExp(teamName,'i')
    DB.find('teamInfo',{$or:[{"teamName": {$regex:reg}}]},(err, res) => {
        if(!res[0]) return
        const baseUrl = 'https://www.dongqiudi.com/team/' + res[0].teamNum + '.html'
        superagent.get(baseUrl).end((err, res) => {
            if (err) {
                callback(err, null)
            } else {
                let $ = cheerio.load(res.text);
                $('.teammates_list>tbody>.stat_list').each((idx, element) => {
                    let playerInfo = {};
                    let $a = cheerio.load(element);
                    if ($('.teammates_list>tbody>.stat_list').attr('style') != undefined) {
                        var playerNum = $a('td:nth-child(3)>a').attr('href')
                        var playerName = $a('td:nth-child(3)>a>span').text();
                        if (playerNum != undefined) {
                            var playerNum = $a('td:nth-child(3)>a').attr('href').replace(/[^0-9]/ig, "");
                            var playerName = $a('td:nth-child(3)>a>span').text();
                            DB.insertOne('player', {
                                playerName: playerName,
                                playerNum: playerNum
                            }, (err, result) => {
                                if (err) console.log('插入失败')
                                else console.log('插入成功')
                            })
                        }
                    }
                })
                return;
            }
        })
    })
}
DB.find('team', {}, (err, res) => {
    const arr = [];
    let idx = 73;
    res.forEach(element => {
        const teamName = element.name;
        arr.push(teamName)
    });
    setInterval(() => {
        if(idx > arr.length) return;
        console.log("+++++++++", arr[idx])
        getPlayerNum(arr[idx])
        idx++;
    }, 5000)
})