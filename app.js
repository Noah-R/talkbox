const express = require('express');
const mysql = require('mysql');
const app = express();


app.use(express.static('public'));

app.post('/*', function(req, res){
    console.log('post received');

    var connection = mysql.createConnection({
        host : 'localhost',
        user: 'root',
        password: 'root',
        database: 'mydb'
    });

    connection.connect(function(err){
        if (err) throw err;
        console.log('Connected');
    });
    
    connection.query('INSERT INTO messages VALUES ('+req.header('id')+', \"'+req.header('email')+'\", \"'+req.header('message')+'\", '+req.header('time')+', '+req.header('parent')+');', function(err){
        if (err) throw err;
    })
    
    connection.end();

})

app.get('/', (req, res) => res.send("/talk to talk, /listen to listen"));

app.listen(3000, () => console.log(`Running at localhost:3000`));

// http://localhost:3000/talk.html