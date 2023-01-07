const router = require('express').Router()

const { setChat, getChat } = require('../contollers/ChatController')


router.post('/', setChat)

router.get('/:userid/:id', getChat)


module.exports = router