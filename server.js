const express = require('express')
const app = express()
const PORT = 3030

// middleware-funktion
const myMiddleware = (req, res, next) => {
    console.log("Hello middleware")
    next()
}
const weekdayNames = (req, res, next) => {
    console.log("Hello other middleware")
    req.weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    next()
}

// behövs för att kunna ta emot JSON i request-bodyn
app.use(express.json())

app.get('/', (req, res) => {
    console.log(`GET request to / from ${req.ip}`)
    res.send('Mainpage!')
})

const notesRouter = require('./routes/notes.js')
app.use('/notes', notesRouter)

const pokeRouter = require('./routes/pokemon.js')
app.use('/pokemon', pokeRouter)

// Middleware exekveras på det stället i koden där den sätts in med app.use()
app.use(myMiddleware)

app.get('/weekdays/:wd', weekdayNames, (req, res) => {
    const wd = req.params.wd
    res.send(req.weekdays[wd-1])
})


console.log("Morjens Node!") 

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})