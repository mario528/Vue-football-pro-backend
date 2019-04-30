const superagent = require('superagent');
const cheerio = require('cheerio');
const DB = require('../../model/database/mongoDB/Dao')
exports.getPlayerInfo = function (playerName, cb) {
    console.log(playerName)
    DB.find('player', {
        playerName: playerName
    }, (err, res) => {
        let playInfo = {};
        let playDetail = {};
        let honnerList = [];
        let invalidList = [];
        const abilityObj = {};
        let playerNum = res[0].playerNum;
        let baseUrl = 'https://www.dongqiudi.com/player/' + playerNum + '.html'
        superagent.get(baseUrl).end((err, res) => {
            if (err) console.log(err);
            const $ = cheerio.load(res.text);
            /** 个人信息 */
            const playerEnName = $('.en_name').text();
            const playerIcon = $('.player_info>img').attr('src')
            const playerName = $('.base_info>div>.name').text();
            const natLogo = $('.base_info>div>.nat_logo').attr('src')
            const clubLogo = $('.base_info>div>.club_logo').attr('src')
            playInfo.playerEnName = playerEnName;
            playInfo.playerIcon = playerIcon;
            playInfo.playerName = playerName;
            playInfo.natLogo = natLogo;
            playInfo.clubLogo = clubLogo;

            /** 个人数据 */
            $('.detail_info').each((idx, element) => {
                const $a = cheerio.load(element)
                playDetail.club = $a('li:nth-child(1)>span:nth-child(2)').text();
                playDetail.position = $a('li:nth-child(2)>span:nth-child(2)').text();
                playDetail.number = $a('li:nth-child(3)>span:nth-child(2)').text();
                playDetail.country = $a('li:nth-child(4)>span:nth-child(2)').text();
                playDetail.age = $a('li:nth-child(5)>span:nth-child(2)').text();
                playDetail.birthday = $a('li:nth-child(6)>span:nth-child(2)').text();
                playDetail.height = $a('li:nth-child(7)>span:nth-child(2)').text();
                playDetail.weight = $a('li:nth-child(8)>span:nth-child(2)').text();
                playDetail.foot = $a('li:nth-child(10)>span:nth-child(2)').text();
            })
            /** 荣誉 */
            $('.honour_record>.honour_list>.honour_item').each((idx, element) => {
                const honnerObj = {};
                const sessions = [];
                const $a = cheerio.load(element);
                honnerObj.honnerImg = $a('.honour_item_title>img').attr('src');
                honnerObj.honnerTitle = $a('.honour_item_title>span:nth-child(2)').text();
                5
                honnerObj.honnerTimes = $a('.honour_item_title>span:nth-child(3)').text();
                $a('.session_area>span').each((idx, element) => {
                    const $aa = cheerio.load(element)
                    let sessionItem = $aa('span').text();
                    sessions.push(sessionItem)
                })
                honnerObj.sessions = sessions;
                honnerList.push(honnerObj)
            })
            /** 转会 */
            $('.transfer_list>.transfer_item').each((idx, element) => {
                const transferObj = {};
                const $a = cheerio.load(element);
                transferObj.transferTime = $a('.transfer_time').text();
                transferObj.type = $a('.transfer_detail').text().replace(/\s+/g, "");
            });
            /** 伤病 */
            $('.invalid_list>.invalid_item').each((idx, element) => {
                const invalidObj = {};
                const $a = cheerio.load(element);
                invalidObj.invalidTeam = $a('.invalid_team').text();
                invalidObj.invalidDetail = $a('.invalid_detail').text();
                invalidObj.invalidTime = $a('.invalid_time').text().replace(/\s+/g, "");
                invalidList.push(invalidObj)
            })
            /** 比赛数据 */
            /** 综合能力 */
            abilityObj.ability = $('.ability>#title>.lv_2').text();
            abilityObj.speed = $('.item0>span').text();
            abilityObj.strong = $('.item1>span').text();
            abilityObj.defend = $('.item2>span').text();
            abilityObj.dribbling = $('.item3>span').text();
            abilityObj.pass = $('.item4>span').text();
            abilityObj.shoot = $('.item5>span').text();
            let playerData = {
                data: {
                    playInfo: playInfo,
                    playDetail: playDetail,
                    honnerList: honnerList,
                    invalidList: invalidList,
                    abilityObj: abilityObj
                }
            }
            cb(null, playerData)
        })
      
    })
}