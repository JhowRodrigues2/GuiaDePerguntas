const express = require('express')
const app = express()

// está dizendo ao Express que irá usar o EJS como View Engine
app.set('view engine','ejs')

//Para a aplicação aceitar arquivos estáticos, no exemplo vindo da pasta public 
app.use(express.static('public'))

// render irá renderizar o html de acordo com o arquivo criado na view
app.get('/',(req, res)=>{
    
    res.render("index")
})
app.get('/perguntar',(req, res)=>{
    
    res.render("perguntar")
})
app.listen(8080,()=>{
    console.log('Aplicação ON!')
})