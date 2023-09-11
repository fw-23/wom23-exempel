const express = require('express')
const app = express()
const auth = require('./middleware/auth')
const PORT = process.env.PORT || 3030

// middleware-funktion
app.use(auth)

// behövs för att kunna ta emot JSON i request-bodyn
app.use(express.json())

app.get('/', (req, res) => {
    console.log(`GET request to / from ${req.ip}`)
    res.send('Mainpage!')
})

const notesRouter = require('./routes/notes.js')
app.use('/notes', notesRouter)

console.log("Morjens Node!") 

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})