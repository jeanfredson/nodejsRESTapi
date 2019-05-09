const express = require('express');
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')
const sequelize = require('sequelize')

const bodyParser =  require('body-parser')

app.use(morgan('short'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

//Funcão para Conectar no banco
function getConnection(){
    return  mysql.createConnection({
         host:  'localhost',
         user: 'root',
         password: '',
         port: '3306',
         database: 'dbAPI'
     })
 }


app.post('/user_create',(req,res)=>{
    console.log("Tentando criar um novo usuario" )
    console.log("FirstName: " + req.body.create_first_name)
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name

    const queryString = "INSERT INTO users (firstName, lastName) VALUES (?,?)"
    getConnection().query(queryString, [firstName, lastName], (err, results, fields)=>{
        if (err){
            console.log("ocorreu um erro ao adicionar um novo usuario "+ err)
            res.sendStatus(500)
            return
        }
        console.log("Novo usuario Inserido com sucesso id: ", results.insertedId)
    } )

    
})

//GET REQUISITION
app.get("/",(req, res)=>{
    console.log("Respondendo a RAIZ")
    res.send("Hello from ROOT")
})


//Trazendo dados do Mysql
app.get('/user/:id',(req,res)=> {
   
    console.log("Pegando o usuario com id: "+ req.params.id )
    
    const connection = getConnection()
    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    connection.query(queryString,[userId], (err, rows, fields)=>{
       if (err) {
        console.log("Ocorreu um erro"+ err)
        res.sendStatus(500)
        return
       }
       console.log("I eu acho que encontrei tudo !")
       const user = rows.map((row)=>{
           return {firstName: row.firstName, lastName: row.lastName}
           res.end()
       })

       res.json(user)
    })
   
})

//GET USERS
app.get('/users',(req,res)=> {
   
    console.log("Pegando o usuario com id: "+ req.params.id )
    
    const connection = getConnection()
    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields)=>{
       if (err) {
        console.log("Ocorreu um erro"+ err)
        res.sendStatus(500)
        return
       }
       console.log("I eu acho que encontrei tudo !")
       const users = rows.map((row)=>{
           return {firstName: row.firstName, lastName: row.lastName}
           res.end()
       })

       res.json(users)
    })
   
})
app.get("/ins",(req,res)=> {
    res.send("teste")
    
    
})
 
app.listen(3003,() => {
console.log("Servidor Ativado e ouvindo na porta 3003" )

})