const express = require('express')
const pokemon = require('pokemon') // Behövs inte för att express ska funka :)
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


app.get('/', (req, res) => {
    console.log(`GET request to / from ${req.ip}`)
    res.send('Mainpage!')
})

// Middleware exekveras på det stället i koden där den sätts in med app.use()
app.use(myMiddleware)

// Vi kan ha flera /hello, om inte den första matchar går programmet vidare till nästa
app.get('/hello', (req, res) => {
    console.log("GET request to hello")
    res.send('Hello-route')
})
app.get('/hello/:name', (req, res) => {
    console.log(req.params) // route-params, här name
    console.log(req.query) // för query-stringen, t.ex. ?foo=bar
    res.send(`Hello, ${req.params.name} `)
})


app.get('/weekdays/:wd', weekdayNames, (req, res) => {
    const wd = req.params.wd
    res.send(req.weekdays[wd-1])
})

app.get('/pokemon', (req, res) => {
    res.send(`Random: 
        ${pokemon.getName(Math.ceil(Math.random()*152))}
    `)
})
app.get('/pokemon/:id', (req, res) => {
    res.send(`Pokemon #${req.params.id} is 
        ${pokemon.getName(req.params.id)}
    `)
})



console.log("Morjens Node!") 

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})