const Sequelize = require('sequelize')
// conexão com o banco usando o sequalize
const connection = new Sequelize('guiaperguntas','root','root',{
    host:'localhost',
    dialect:'mysql'
})
// exportando essa conexão
module.exports = connection