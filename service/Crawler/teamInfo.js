const superagent = require('superagent');
const cheerio = require('cheerio');
const rankType = require('./rankType')

exports.getTeamData = function (teamName, callback) {
    const teamNum = rankType[teamName];
    const baseUrl = 'https://www.dongqiudi.com/team/' + teamNum + '.html';
    const schedule = [];
    const teamMember = [];
    superagent.get(baseUrl).end((err, res) => {
        if (err) {
            callback(err, null)
        } else {
            let $ = cheerio.load(res.text);
            const teamIcon = $('.player_img').attr('src')
            const teamTitle = $('.en_name').text();
            const nationalFlag = $('.nat_logo').attr('src')
            let startTime = $('.detail_info>.t1:nth-child(1)>span:nth-child(3)').text();
            let teamCountry = $('.detail_info>.t3:nth-child(2)>span:nth-child(3)').text();
            let teamCity = $('.detail_info>.t1:nth-child(3)>span:nth-child(3)').text();
            let homeCourt = $('.detail_info>.t3:nth-child(4)>span:nth-child(3)').text().replace(/\s+/g, "");
            let teamAddress = $('.detail_info>li:nth-child(7)>span:nth-child(3)').text()
            $('.schedule_list .stat_list').each((idx, element) => {
                const teamSchedule = {}
                let $ = cheerio.load(element);
                let matchType = $('.gameweek').text().replace(/\s+/g, "");
                let homeTeamName = $('.stat_list>td:nth-child(4)>a>span').text().replace(/\s+/g, "");
                let awayTeamName = $('.stat_list>td:nth-child(6)>a>span').text().replace(/\s+/g, "");
                let homeTeamIcon = $('.stat_list>td>a>img').attr('src');
                let awayTeamIcon = $('.stat_list>td:nth-child(6)>a>img').attr('src');
                let homeScore = $('.fs_a').html();
                let awayScore = $('td > .fs_b').html();
                teamSchedule.matchType = matchType;
                teamSchedule.homeTeamIcon = homeTeamIcon;
                teamSchedule.awayTeamIcon = awayTeamIcon;
                teamSchedule.homeScore = homeScore;
                teamSchedule.awayScore = awayScore;
                teamSchedule.homeTeamName = homeTeamName;
                teamSchedule.awayTeamName = awayTeamName;
                schedule.push(teamSchedule)
            })
            $('.teammates_list>tbody>.stat_list').each((idx, element) => {
                let playerInfo = {};
                let $a = cheerio.load(element);
                if($('.teammates_list>tbody>.stat_list').attr('style') == undefined) {
                    var playerIcon = $a('td:nth-child(3)>img').attr('src');
                    var playerName = $a('td:nth-child(3)>span').text();
                } else {
                    if(idx == 1) {
                        console.log($('.teammates_list>tbody>.stat_list').attr('style'))
                    } 
                    var playerIcon = $a('td:nth-child(3)>a>img').attr('src');
                    var playerName = $a('td:nth-child(3)>a>span').text();
                }
                let playerLocation = $a('td:nth-child(1)').text();
                let playerNum = $a('td:nth-child(2)').text();
                let playerEnterNum = $a('td:nth-child(4)').text();
                let playerScoreNum = $a('td:nth-child(5)').text();
                let playerNationFlag = $a('td:nth-child(6)>img').attr('src');
                playerInfo.playerLocation = playerLocation;
                playerInfo.playerNum = playerNum;
                playerInfo.playerIcon = playerIcon;
                playerInfo.playerName = playerName;
                playerInfo.playerEnterNum = playerEnterNum;
                playerInfo.playerScoreNum = playerScoreNum;
                playerInfo.playerNationFlag = playerNationFlag;
                teamMember.push(playerInfo)
            })
            let teamInfo = {
                teamIcon: teamIcon,
                teamTitle: teamTitle,
                startTime: startTime,
                teamCountry: teamCountry,
                teamCity: teamCity,
                teamAddress: teamAddress,
                homeCourt: homeCourt,
                nationalFlag: nationalFlag,
                schedule: schedule,
                teamMember: teamMember
            }
            callback(null, teamInfo)
        }
    })
}