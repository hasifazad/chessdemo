const Chat = require('../models/Chat');



module.exports = {
    setChat: async (req, res, next) => {
        console.log(req.body);

        try {
            let firstPerson = await Chat.find({ person: { $all: [req.body.first_person, req.body.second_person] } })
            if (firstPerson.length == 0) {
                let chat = await Chat.create({
                    person: [req.body.first_person, req.body.second_person],
                    chat: [{
                        sender: req.body.sender,
                        reciver: req.body.reciever,
                        message: req.body.message
                    }]

                })
                chat.save()
            } else {
                await Chat.updateOne({ person: { $all: [req.body.first_person, req.body.second_person] } }, {
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
    },

    getChat: async (req, res, next) => {

        try {
            let chats = await Chat.find({ person: { $all: [req.params.userid, req.params.id] } })
            if (chats.length !== 0) {
                res.status(200).json(chats)
            } else {
                res.status(200).json({ message: false })
            }
        } catch (error) {
            next(error)
        }
    }
}