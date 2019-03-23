const login = require('./login') // 登陆接口
const register = require('./register') // 注册接口
const home = require('./home') //请求主页
const userIcon = require('./userIcon') // 更换用户头像
const dataSearch = require('./dataSearch') // 数据搜索功能
const changeUserInfo = require('./changeUserInfo') // 修改信息
const getTeamInfo = require('./getTeamInfo') // 获取球队信息
const getUserInfo = require('./getUserInfo') // 获取用户信息
const getTeamData = require('./getTeamData')
const joinFavouriteTeam = require('./joinFavouriteTeam')
// const getPlayerInfo = require('./getUserInfo') // 获取球员信息
module.exports = (app) => {
    app.use(login)
    app.use(register)
    app.use(home)
    app.use(userIcon)
    app.use(dataSearch)
    app.use(changeUserInfo)
    app.use(getTeamInfo)
    app.use(getUserInfo)
    app.use(getTeamData)
    app.use(joinFavouriteTeam)
    // app.user(getPlayerInfo)
}