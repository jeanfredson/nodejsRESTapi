const express = require('express');
const app = express()
const morgan = require('morgan')

app.use(morgan('combined'))

//GET REQUISITION
app.get("/",(req, res)=>{
    console.log("Respondendo a RAIZ")
    res.send("Hello from ROOT")
})

//GET USERS
app.get("/users",(req,res) => {
    const usuario1 = {firstName:"Jean", lastName:"Dantas"}
    const usuario2 = {firstName:"Matheus Fredson", lastName:"Dantas"}

    res.json([usuario1, usuario2])
  
    console.log("Estou no /users")
})

app.get("/ins",(req,res)=> {
    res.send("teste")
    
    
})
 
app.listen(3003,() => {
console.log("Servidor Ativado e ouvindo na porta 3003" )

})