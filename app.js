const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => res.send("/talk to talk, /listen to listen"))

app.listen(port, () => console.log(`Running at localhost:${port}`))

// http://localhost:3000/talk.html