const { async } = require('q');
const Ranking = require('../models/Ranking')



module.exports = {
    getAllRanking: async (req, res, next) => {
        Ranking.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $project: {
                    _id: 1,
                    user_id: 1,
                    ranking: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    user: { $arrayElemAt: ['$user', 0] }
                }
            }
        ]).sort({ 'ranking.point': -1 }).then((response) => {
            console.log(response);
            res.status(200).json(response)
        }).catch((err) => {
            next(err)
        })
    },



    setRanking: async (req, res) => {
        console.log(req.body);
        if (req.body.win) {
            console.log('winnnnnnnnh');
            await Ranking.updateOne({ user_id: req.body.userId }, {
                $inc: { "ranking.win": 1, "ranking.point": 2 }
            })
        }
        else if (req.body.lose) {
            console.log('dsfdsf');
            await Ranking.updateOne({ user_id: req.body.userId }, {
                $inc: { "ranking.lose": 1 }
            })
        }
        else if (req.body.draw) {
            await Ranking.updateOne({ user_id: req.body.userId }, {
                $inc: { "ranking.draw": 1, "ranking.point": 1 }
            })
        }
    }
}