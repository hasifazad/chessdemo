
const { async } = require('q');
const { update } = require('../models/Game');
const Game = require('../models/Game')
const ObjectId = require('objectid')

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
        await Game.updateOne({ _id: req.body.matchLink }, {
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
            let [a] = await Game.find({ _id: req.params.link }, { first_player: 1, second_player: 1, time: 1 })
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

    },

    getTimeAndPlayer: async (req, res) => {
        console.log(req.params);
        let b = await Game.aggregate([
            {
                $match: { _id: ObjectId(req.params.gameId) }
            },
            {
                $project: {
                    first_player: 1,
                    second_player: 1,
                    time: 1
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'first_player.id',
                    foreignField: '_id',
                    as: 'user1'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'second_player.id',
                    foreignField: '_id',
                    as: 'user2'
                }
            },
            {
                $project: {
                    time: 1,
                    user1: { $arrayElemAt: ['$user1', 0] },
                    user2: { $arrayElemAt: ['$user2', 0] }
                }
            },
            {
                $project: {
                    time: 1,
                    user1: '$user1.username',
                    user2: '$user2.username'
                }
            }
        ])
        console.log(b);
        res.status(200).json(b[0])
    }

}