const express = require('express');
const mysql = require('mysql');
const app = express();


app.use(express.static('public'));

app.post('/*', function(req, res){

    var connection = mysql.createConnection({
        host : 'localhost',
        user: 'root',
        password: 'root',
        database: 'mydb'
    });

    connection.connect(function(err){
        if (err) throw err;
    });
    
    connection.query('INSERT INTO messages VALUES ('+req.header('id')+', \"'+req.header('email')+'\", \"'+req.header('message')+'\", '+req.header('time')+', '+req.header('parent')+');', function(err){
        if (err) throw err;
    })
    
    connection.end();

})

app.get('/*', (req, res) => {
    
    var connection = mysql.createConnection({
        host : 'localhost',
        user: 'root',
        password: 'root',
        database: 'mydb'
    });

    connection.connect(function(err){
        if (err) throw err;
    });
    
    connection.query('SELECT * FROM messages ORDER BY RAND() LIMIT 1;', function(err, result){
        if (err) throw err;
        var obj={message: result[0].message, id: result[0].id};
        res.json(obj);
    })
    
    connection.end();
});

app.listen(3000, () => console.log(`Running at localhost:3000`));

// http://localhost:3000/talk.html