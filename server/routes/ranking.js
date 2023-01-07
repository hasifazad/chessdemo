const router = require('express').Router()
const { async } = require('q')
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

router.patch('/', async (req, res, next) => {
    console.log(req.body);
    try {
        if (req.body.add_to_ranking) {
            let a = await Ranking.updateOne(
                { user_id: req.body.user_id },
                {
                    ranking: {

                        win: { $add: ["$win", 1] },
                        lose: req.body.lose,
                        draw: req.body.draw,
                        point: req.body.point,

                    }
                }
            )
            console.log(a);
        } else {

        }
    } catch (error) {
        console.log(error);
        next(error)
    }
})








module.exports = router