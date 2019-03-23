const superagent = require('superagent');
const cheerio = require('cheerio');
const rankType = require('./teamType')
let getTeamMember = function (teamName) {
    const baseUrl = 'https://www.dszuqiu.com/team/1216';
    console.log(baseUrl);
    superagent.get(baseUrl).end((err, res) => {
        let teamMember = []
        if (err) {
            callback(err, null);
        } else {
            let $ = cheerio.load(res.text);
            $('.tabs-content>section:nth-child(1)>.row:nth-child(1)').each((idx, element) => {
                console.log(idx)
            })
            // callback(null, teamInformation)
        }
    })
}
getTeamMember('北京中赫国安');