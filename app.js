const express = require('express');
const mysql = require('mysql');
const app = express();
var pool = mysql.createPool({
    host : 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

app.use(express.static('public'));

app.post('/*', function(req, res){

    pool.query('INSERT INTO messages VALUES ('+req.header('id')+', \"'+req.header('email')+'\", \"'+req.header('message')+'\", '+req.header('time')+', '+req.header('parent')+');', function(err){
        if (err) throw err;
        res.send("Success");
    })

})

app.get('/*', (req, res) => {
    
    pool.query('SELECT * FROM messages ORDER BY RAND();', function(err, result){
        if (err) throw err;
        var obj={message: result[0].message, id: result[0].id, parentmessage:null};
        if(result[0].parent!=0){
            for(var i=0; i<result.length; i++){
                if(result[i].id==result[0].parent){
                    obj.parentmessage=result[i].message;
                    console.log("found it");
                }
            }
        }
        res.json(obj);
    })
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => console.log(`Running at localhost:`+port));

// http://localhost:3000/talk.html