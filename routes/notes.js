const express = require('express')
const router = express.Router()


// relativt till notes/
router.get('/', (req, res) => {
    console.log("notes GET")
    res.send({ msg: 'notes'})
})

module.exports = router