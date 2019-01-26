const login = require('./login')
const register = require('./register')
const home = require('./home')
const userIcon = require('./userIcon')
module.exports = (app) => {
    app.use(login)
    app.use(register)
    app.use(home)
    app.use(userIcon)
}