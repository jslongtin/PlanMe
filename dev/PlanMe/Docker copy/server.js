const express = require('express')
const app = express()
app.get('/',(req,res) => res.send('Hello word'))
app.listen(5432,() => console.log('Server up on port 5432'))