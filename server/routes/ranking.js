const router = require('express').Router()
const { setRanking, getAllRanking } = require('../contollers/RankingController.js')
const Ranking = require('../models/Ranking.js')



router.post('/', async (req, res, next) => {
    try {
        let r = await Ranking.create({
            user_id: req.body.user_id,
            ranking: {
                win: 0,
                lose: 0,
                draw: 0,
                point: 0
            }
        })
        r.save()
        console.log(r);
    } catch (error) {
        console.log(error);
        next(error)
    }
})

router.patch('/set-ranking', setRanking)


router.get('/get-ranklist', getAllRanking)








module.exports = router