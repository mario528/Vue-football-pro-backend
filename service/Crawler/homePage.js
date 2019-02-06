const superagent = require('superagent');
const cheerio = require('cheerio');
const rankType = require('./rankType')
const baseUrl = 'https://www.dongqiudi.com';

exports.getHomepageBanner = function (callback) {
    superagent.get(baseUrl).end((err, res) => {
        if (err) {
            callback(err, null);
        } else {
            let $ = cheerio.load(res.text);
            let swiperObj = [];
            $('#show>ul>li>a>img').each((idx, element) => {
                let $element = $(element);
                const url = $element.attr('src')
                swiperObj[idx] = {}
                swiperObj[idx].url = url;
            })
            $('#show>ul>li>a>h3').each((idx, element) => {
                let $element = $(element);
                const title = $element.text()
                swiperObj[idx].title = title
            })
            callback(null, swiperObj)
        }
    })
}
exports.getHotMatch = function (callback) {
    
}