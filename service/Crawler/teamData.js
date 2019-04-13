const superagent = require('superagent');
const cheerio = require('cheerio');
const rankType = require('./rankType')
const DB = require('../../model/database/mongoDB/Dao')
const teamDetailInfo = require('./getTeamDetailInfo')
exports.getTeamData = function (teamName, callback) {
    DB.find('teamInfo', {
        'teamName': teamName
    }, (err, result) => {
        const teamNum = result[0].teamNum;
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
                $('.schedule_list .stat_list').each((idx, element) => {
                    const teamSchedule = {}
                    let $ = cheerio.load(element);
                    let matchType = $('.gameweek').text().replace(/\s+/g, "");
                    let homeTeamName = $('.stat_list>td:nth-child(4)>a>span').text().replace(/\s+/g, "");
                    let awayTeamName = $('.stat_list>td:nth-child(6)>a>span').text().replace(/\s+/g, "");
                    let homeScore = $('.fs_a').html();
                    let awayScore = $('td > .fs_b').html();
                    teamSchedule.matchType = matchType;
                    teamSchedule.homeScore = homeScore;
                    teamSchedule.awayScore = awayScore;
                    teamSchedule.homeTeamName = homeTeamName;
                    teamSchedule.awayTeamName = awayTeamName;
                    schedule.push(teamSchedule)
                })
                $('.teammates_list>tbody>.stat_list').each((idx, element) => {
                    let playerInfo = {};
                    let $a = cheerio.load(element);
                    if ($('.teammates_list>tbody>.stat_list').attr('style') == undefined) {
                        var playerName = $a('td:nth-child(3)>span').text();
                    } else {
                        if (idx == 1) {
                            console.log($('.teammates_list>tbody>.stat_list').attr('style'))
                        }
                        var playerName = $a('td:nth-child(3)>a>span').text();
                    }
                    let playerLocation = $a('td:nth-child(1)').text();
                    let playerEnterNum = $a('td:nth-child(4)').text();
                    let playerScoreNum = $a('td:nth-child(5)').text();
                    playerInfo.playerLocation = playerLocation;
                    playerInfo.playerName = playerName;
                    playerInfo.playerEnterNum = playerEnterNum;
                    playerInfo.playerScoreNum = playerScoreNum;
                    teamMember.push(playerInfo)
                })
                $('.teammates_list>tbody>.stat_list').each((idx, element) => {
                    let playerInfo = {};
                    let $a = cheerio.load(element);
                    if ($('.teammates_list>tbody>.stat_list').attr('style') == undefined) {
                        var playerIcon = $a('td:nth-child(3)>img').attr('src');
                        var playerName = $a('td:nth-child(3)>span').text();
                    } else {
                        if (idx == 1) {
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
                let combatGains = _getGradeFluctuate(schedule)
                teamDetailInfo._getTeamDetailInfo((res)=> {
                    let teamInfo = {
                        data: {
                            teamInfo: {
                                teamIcon: teamIcon,
                                teamTitle: teamTitle,
                            },
                            playerDetail: res,
                            schedule: schedule,
                            teamMember: teamMember,
                            combatGains: combatGains
                        },
                        status: true
                    }
                    callback(null, teamInfo)
                });
            }
        });
    })

}

function _getGradeFluctuate(matchList) {
    var teamGrade = []
    matchList.forEach(element => {
        if (element.awayScore !== "" && element.homeScore !== "") {
            if (element.awayScore === element.homeScore) {
                teamGrade.push("1");
            } else if (element.homeScore > element.awayScore) {
                if (element.homeTeamName === this.teamName) {
                    teamGrade.push("2");
                } else {
                    teamGrade.push("0");
                }
            } else {
                if (element.homeTeamName === this.teamName) {
                    teamGrade.push("0");
                } else {
                    teamGrade.push("2");
                }
            }
        }
    });
    return teamGrade
}