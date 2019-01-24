const login = require('./login')
const register = require('./register')
module.exports = (app) => {
    app.use(login)
    app.use(register)
}