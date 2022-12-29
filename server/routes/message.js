const router = require('express').Router()
const Message = require('../models/Message');



router.post('/', async (req, res, next) => {
    try {
        let firstPerson = await Message.find({ person: { $all: [req.body.first_person, req.body.second_person] } })
        if (firstPerson.length == 0) {
            let message = await Message.create({
                person: [req.body.first_person, req.body.second_person],
                chat: [{
                    sender: req.body.sender,
                    reciver: req.body.reciever,
                    message: req.body.message
                }]

            })
            message.save()
        } else {
            await Message.updateOne({ person: { $all: [req.body.first_person, req.body.second_person] } }, {
                $push: {
                    chat: {
                        sender: req.body.sender,
                        reciver: req.body.reciever,
                        message: req.body.message
                    }

                }
            })
        }

    } catch (error) {
        next(error)
    }
})

router.get('/:userid/:id', async (req, res, next) => {
    try {
        let messages = await Message.find({ person: { $all: [req.params.userid, req.params.id] } })
        if (messages.length !== 0) {
            res.status(200).json(messages)
        } else {
            res.status(200).json({ message: false })
        }
    } catch (error) {
        next(error)
    }
})


module.exports = router