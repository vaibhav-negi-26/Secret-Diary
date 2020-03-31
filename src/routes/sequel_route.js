const express = require('express')
const router = new express.Router()
const Diary = require('../model/sequel')
const auth = require('../middleware/auth')

// Create and login endpoints 
router.post('/sequel/create', auth, async (req, res) => {
    const sequel = new Diary({
        ...req.body,
        owner: req.user._id
    })
    try {
        await sequel.save()
        res.status(201).send({
            sequel
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

// finding all sequles realted to a user
router.get('/sequel/all', auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'sequel',
            options: {
                sort: {
                    updatedAt: -1
                }
            }
        }).execPopulate()
        res.send(req.user.sequel)
    } catch (error) {
        res.status(500).send(error)
    }
})

// find sequel by id 
router.get('/sequel/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const sequel = await Diary.findOne({
            _id,
            owner: req.user._id
        })
        if (!sequel) {
            return res.status(404).send()
        }
        res.send(sequel)
    } catch (error) {
        res.status(500).send()
    }
})

// updateing sequel by id
router.patch('/sequel/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["title", "content"]
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if (!isValid) {
        res.status(400).send({
            error: "invalid field is being updated!"
        })
    }
    const _id = req.params.id
    try {
        const sequel = await Diary.findOne({
            _id,
            owner: req.user._id
        })
        if (!sequel) {
            return res.status(404).send()
        }
        updates.forEach((update) => sequel[update] = req.body[update])
        await sequel.save()
        res.send(sequel)
    } catch (error) {
        res.status(500).send()
    }
})

// deleting task by id
router.delete('/sequel/:id', auth, async (req, res) => {
    try {
        const sequel = await Diary.findOneAndDelete({
            _id: req.params.id,
            owner: req.user._id
        })

        if (!sequel) {
            res.status(404).send()
        }

        res.send(sequel)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router