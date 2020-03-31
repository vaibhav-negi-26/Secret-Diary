const express = require('express')
const router = new express.Router()
const Diary = require('../model/sequel')

// Create and login endpoints 
router.post('/sequel/create', async (req,res) => {
    const sequel = new Diary(req.body)
    try {
        await sequel.save()
        res.status(201).send({
            sequel
        })
    } catch (error) {
        res.status(400).send(error)
    }
})
// router.post('/sequel/login:title', async (req, res) => {
//     try {
//         const sequel = await User.findByCredentials(req.body.email, req.body.password)
//         res.send({
//             user
//         })
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

module.exports = router