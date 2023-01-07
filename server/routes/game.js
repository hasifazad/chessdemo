const router = require('express').Router()

const { setGame, setMove, getGame, getTimeAndPlayer } = require('../contollers/GameController')


router.post('/create-game', setGame)

router.put('/set-move', setMove)

router.get('/get-game/:link/:userId', getGame)

router.get('/get-time-player/:gameId', getTimeAndPlayer)







module.exports = router