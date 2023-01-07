const router = require('express').Router()

const { setGame, setMove, getGame } = require('../contollers/GameController')


router.post('/create-game', setGame)

router.put('/set-move', setMove)

router.get('/get-game/:link/:userId', getGame)







module.exports = router