const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// disable for production?
router.get('/', async (req, res) => {
    const users = await prisma.users.findMany()
    console.log("users GET")
    res.send({ 
        msg: 'users', 
        users: users
    })
})

// restrict for production
router.get('/:id', async (req, res) => {

    const user = await prisma.users.findUnique({
        where: {id: req.params.id}
    })

    console.log("users GET ONE")
    res.send({ msg: 'users', user: user })
})


router.post('/', async (req, res) => {

    const hash = await bcrypt.hash(req.body.password, 12)

    const user = await prisma.users.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            password: hash
            
        },
    })
    console.log("user created:", user)
    res.send({ msg: 'user created', id: user.id })
})

router.patch('/:id', async (req, res) => {

    const user = await prisma.users.update({
        where: {
            id: req.params.id,
        },
        data: {
            updatedAt: new Date()
        },
    })
    res.send({
        msg: 'patch',
        id: req.params.id,
        user: user
    })
})

router.delete('/:id', async (req, res) => {

    try {

        const user = await prisma.users.delete({
            where: {
                id: req.params.id,
            }
        })
        res.send({
            msg: 'deleted',
            id: req.params.id,
            user: user
        })
    } catch (err) {

        console.log(err)
        res.send({
            msg: 'ERROR',
            error: err
        })
    }
})

module.exports = router