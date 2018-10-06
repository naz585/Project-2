const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const userMeta = sequelize.define('UserData', {
    username: Sequelize.STRING(20),
    photo: Sequelize.STRING(200),
    name: Sequelize.STRING(100),
    party: Sequelize.STRING(100),
    phone: Sequelize.STRING(20),
    website: Sequelize.STRING(200),
  })

  module.exports = userMeta

