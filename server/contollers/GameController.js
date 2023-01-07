
const { async } = require('q');
const { update } = require('../models/Game');
const Game = require('../models/Game')

module.exports = {
    setGame: async (req, res, next) => {
        console.log(req.body);
        let gameId = await Game.create({
            first_player: {
                id: req.body.first_player,
                color: req.body.color
            },
            second_player: {
                id: null,
                color: req.body.color
            },
            time: req.body.time

        })
        gameId.save()
        console.log(gameId);
        res.json(gameId._id)
    },

    setMove: async (req, res) => {
        console.log(req.body);
        await Game.updateOne({}, {
            $push: {
                moves: req.body.aMove,
                fen: req.body.aFen
            }
        })


        res.status(200).json('success')
    },

    getGame: async (req, res) => {
        console.log(req.params);
        try {
            let [a] = await Game.find({ _id: req.params.link }, { first_player: 1, second_player: 1 })
            console.log(a);
            if (a) {
                if (a.first_player.id != req.params.userId) {
                    if (a.second_player.id != req.params.userId) {
                        if (a.second_player.id == null) {
                            Game.updateOne({ _id: req.params.link }, { 'second_player.id': req.params.userId }).then(() => {
                                res.json({ id: req.params.userId, color: a.color })

                            }).catch(() => {

                            })
                        } else {
                            res.json('invalid link')
                        }
                    } else {
                        res.json(a.second_player)
                    }
                } else {
                    res.json(a.first_player)
                }
            } else {
                res.json('invalid link')
            }
        } catch (err) {
            res.json('invalid link')
        }

    }

}