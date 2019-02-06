const superagent = require('superagent');
const cheerio = require('cheerio');
const rankType = require('./rankType')

exports.getTeamData = function (teamName, callback) {
    const teamNum = rankType[teamName];
    const baseUrl = 'https://www.dongqiudi.com/team/'+ teamNum + '.html';
    const schedule = [];
    superagent.get(baseUrl).end((err,res)=> {
        if(err) {
            callback(err, null)
        } else {
            let $ = cheerio.load(res.text);
            const teamIcon = $('.player_img').attr('src')
            const teamTitle = $('.en_name').text();
            const nationalFlag = $('.nat_logo').attr('src')
            $('.schedule_list .stat_list').each((idx,element)=> { 
                const teamSchedule = {}
                let $ = cheerio.load(element);
                let matchType = $('.gameweek').text().replace(/\s+/g,"");
                let homeTeamName = $('.stat_list>td:nth-child(4)>a>span').text().replace(/\s+/g,"");
                let awayTeamName = $('.stat_list>td:nth-child(6)>a>span').text().replace(/\s+/g,"");
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
            let teamInfo = {
                teamIcon: teamIcon,
                teamTitle: teamTitle,
                nationalFlag: nationalFlag,
                schedule: schedule,
            }
            callback(null , teamInfo)
        }
    })
}
