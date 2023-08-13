const jwt = require('jsonwebtoken')
//const config = require('../utils/config.js')
const loginVilleAuthToken = (fug) => {
    const userForToken = {
        username: 'ville',
        id: '64c982c350d0acd263a57489',
    }
    const token = `Bearer ${jwt.sign(userForToken, process.env.SECRET)}`
    return { Authorization: token }
}
const gurgl = () => {
    return "gurgl"
}

module.exports = {
    loginVilleAuthToken,
    gurgl
}