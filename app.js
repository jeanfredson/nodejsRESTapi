const express = require('express');
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const sequelize = require('sequelize')

app.use(morgan('combined'))

//GET REQUISITION
app.get("/",(req, res)=>{
    console.log("Respondendo a RAIZ")
    res.send("Hello from ROOT")
})
//Trazendo dados do Mysql
app.get('/user/:id',(req,res)=> {
   
    console.log("Pegando o usuario com id: "+ req.params.id)
    
    const connection = mysql.createConnection({
        host:  'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'dbAPI'
    })
  
    
    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    connection.query(queryString,[userId], (err, rows, fields)=>{
       if (err) {
        console.log("Ocorreu um erro"+ err)
        res.sendStatus(500)
        return
       }
       console.log("I eu acho que encontrei tudo !")
       const users = rows.map((row)=>{
           return {firstName: row.firstName, lastName: row.lastName}
       })

       res.json(users)
    })
   
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