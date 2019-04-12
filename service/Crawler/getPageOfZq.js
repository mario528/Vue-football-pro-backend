const superagent = require('superagent');
const cheerio = require('cheerio');
const baseURL = 'http://zq.win007.com/cn/team/Summary/43.html';
const _crawlerFun = function () {
    superagent.get(baseURL).end((err,res)=> {
        const $ = cheerio.load(res.text);
        $('')
    })
}