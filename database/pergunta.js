const Sequelize = require("sequelize");
const connection = require("./database");

// criação de um modulo, define a tabela, no exemplo a tabela do DB chamará pergunta
const Pergunta = connection.define("pergunta", {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false, // não aceita no DB que esse campo seja nulo.
  },
  descricao: {
    type: Sequelize.TEXT,
    allowNull: false, 
  },
});

// sincroniza os dados acima com o DB, o force não irá forçar criar a tabela caso ela exista
Pergunta.sync({force:false}).then(()=>{})
// para criar é só importar o module no index