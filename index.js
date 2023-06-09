const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/pergunta");
const Resposta = require("./database/Resposta");
connection
  .authenticate()
  .then(() => {
    console.log("Conexão realizada com o DB com sucesso!");
  })
  .catch((error) => {
    console.log(error);
  });

// está dizendo ao Express que irá usar o EJS como View Engine
app.set("view engine", "ejs");

//Para a aplicação aceitar arquivos estáticos, no exemplo vindo da pasta public
app.use(express.static("public"));

//permite que a pessoa envie os dados do formulário e bodyparser irá traduzir pra javascript
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// render irá renderizar o html de acordo com o arquivo criado na view
app.get("/", (req, res) => {
  // o raw:true lista apenas os dados em json, ordena pelo id do maior pelo menor
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", {
      perguntas: perguntas,
    });
  });
});
app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});
app.post("/salvarpergunta", (req, res) => {
  let titulo = req.body.titulo;
  let descricao = req.body.descricao;
  // metodo responsável por salvar a pergunta no DB, o mesmo que fazer um insert
  Pergunta.create({
    titulo: titulo,
    descricao: descricao,
  }).then(() => {
    //após salvar a pergunta no DB, a página será redirecionada para a principal (/)
    res.redirect("/");
  });
});
// filtrar a pergunta de acordo com seu id
app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;
  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: {
          perguntaId: pergunta.id,
        },
        order:[['id','DESC']]
      }).then(respostas =>{
        res.render("pergunta", {
          pergunta: pergunta,
          respostas:respostas
        });
      });
    } else {
      res.redirect("/");
    }
  });
});
// inserir resposta no DB
app.post("/responder", (req, res) => {
  let corpo = req.body.corpo;
  let perguntaId = req.body.pergunta;
  Resposta.create({ corpo: corpo, perguntaId: perguntaId }).then(() => {
    res.redirect("/pergunta/" + perguntaId);
  });
});
app.listen(8080, () => {
  console.log("Aplicação ON!");
});
