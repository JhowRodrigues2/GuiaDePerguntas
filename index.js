const express = require('express')
const app = express()
const bodyParser = require('body-parser')


// está dizendo ao Express que irá usar o EJS como View Engine
app.set('view engine','ejs')

//Para a aplicação aceitar arquivos estáticos, no exemplo vindo da pasta public 
app.use(express.static('public'))

//permite que a pessoa envie os dados do formulário e bodyparser irá traduzir pra javascript
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

// render irá renderizar o html de acordo com o arquivo criado na view
app.get('/',(req, res)=>{
    res.render("index")
})
app.get('/perguntar',(req, res)=>{
    
    res.render("perguntar")
})
app.post('/salvarpergunta',(req, res)=>{
    let titulo= req.body.titulo
    let descricao= req.body.descricao
    res.send(titulo)
})

app.listen(8080,()=>{
    console.log('Aplicação ON!')
})