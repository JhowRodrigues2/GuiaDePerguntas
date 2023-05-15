const Sequelize = require("sequelize");
const connection = require("./database");

// criação da resposta
const Resposta = connection.define("respostas", {
  corpo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Resposta.sync({ force: false });

module.exports = Resposta;
