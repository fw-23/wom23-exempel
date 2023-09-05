const express = require('express')
const pokemon = require('pokemon') // Behövs inte för att express ska funka :)
const router = express.Router()

router.get('/', (req, res) => {
    res.send(`Random: 
        ${pokemon.getName(Math.ceil(Math.random()*152))}
    `)
})
router.get('/:id', (req, res) => {
    res.send(`Pokemon #${req.params.id} is 
        ${pokemon.getName(req.params.id)}
    `)
})

module.exports = router