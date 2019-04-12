const superagent = require('superagent');
const cheerio = require('cheerio');
const baseUrl = 'http://sports.sina.com.cn/csl/beijing/'
exports._getTeamDetailInfo = function (callback) {
    let arr = []
    superagent.get(baseUrl).end((idx, res) => {
        const $ = cheerio.load(res.text)
        $('#blk_cont_g41>div>p').each((idx, res) => {
            let $a = cheerio.load(res)
            const playerName = $a('d1>a').text();
            const playerAge = $a('d4').text();
            const playerHeight = $a('d6').text();
            const playerWeight = $a('d7').text();
            arr[idx] = {};
            arr[idx].playerName = playerName;
            arr[idx].playerAge = playerAge;
            arr[idx].playerHeight = playerHeight;
            arr[idx].playerWeight = playerWeight;
        })
        callback(arr)
    })
}
