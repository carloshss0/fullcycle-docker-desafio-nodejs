const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql2')
const connection = mysql.createConnection(config)


app.get('/', (req, res) => {

    const sql1 = `INSERT INTO people(name) values('Wesley')`
    const sql2 = `INSERT INTO people(name) values('Carlos')`
    const sql3 = `INSERT INTO people(name) values('Silva')`

    connection.query(sql1)
    connection.query(sql2)
    connection.query(sql3)

    const query = `SELECT name FROM people`
    connection.query(query, (err, result) => {

    if(err) throw err

    const listItems = result.map( (person) => `<li>${person.name}</li>`).join('')

    const html = `
        <h1>Full Cycle Rocks!</h1>

        <h2> Lista de pessoas</h2>
        <ul>
            ${listItems}
        </ul>
    `
    res.send(html)
    })
    
})


app.listen(port, ()=> {
    console.log('Rodando na porta ' + port )
})
