const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => res.send("Server root"))

app.listen(port, () => console.log(`Running at localhost:${port}`))