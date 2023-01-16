const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { async } = require('q')
const Ranking = require('../models/Ranking')
const User = require('../models/User')
const ObjectId = require('mongoose').Types.ObjectId
const { uploadToS3 } = require('../configs/s3')


module.exports = {

    signup: (req, res, next) => {
        try {
            bcrypt.hash(req.body.password, 10).then(async (hash) => {
                const user = await User.create({
                    username: req.body.username,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: hash
                })
                console.log(user);
                user.save()
                const ranking = await Ranking.create({
                    user_id: user._id,
                    ranking: {

                    }
                })
                ranking.save()
                res.status(200).json('signup successful')

            }).catch((err) => {
                console.log(err);
                res.status(400).json('email already exist')
            })
        } catch (error) {
            next(error)
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.find({ email: req.body.email })
            console.log(user);
            if (user.length !== 0) {
                bcrypt.compare(req.body.password, user[0].password).then((result) => {
                    let obj = {
                        _id: user[0]._id,
                        username: user[0].username,
                        email: user[0].email
                    }
                    if (result) {
                        jwt.sign(obj, 'chess', (err, token) => {
                            res.status(200).json({ user: user[0], token })
                        })
                    } else {
                        throw 'wrong password'
                    }
                }).catch((err) => {
                    console.log(err)
                    res.status(400).json(err)
                })
            } else {
                res.status(400).json('email not exist')
            }
        } catch (error) {
            console.log(error);
        }
    },

    getUsers: async (req, res, next) => {
        try {
            const allUsers = await User.find()
            res.status(200).json(allUsers)
        } catch (error) {
            next(error)
        }
    },

    verifyToken: (req, res) => {
        jwt.verify(req.params.token, 'chess', async (err, response) => {
            if (err) {
                console.log(err);
            } else {
                const user = await User.find({ _id: response._id })
                res.status(200).json(user[0])
            }
        })
    },

    setProfilePic: async (req, res) => {
        console.log(req.body);
        console.log(req.file.filename);
        console.log(req.file);

        const { key, err } = uploadToS3({ file: req.file, userId: req.body.user_id })
        console.log(key);
        console.log(err);

        let a = await User.updateOne({ _id: req.body.user_id }, {
            $set: {
                image: req.file.originalname
            }
        })
    },

    getProfile: (req, res, next) => {
        console.log(req.params);
        User.aggregate([
            {
                $match: {
                    _id: ObjectId(req.params.userId)
                }
            },
            {
                $lookup: {
                    from: 'rankings',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'ranking'
                }
            }, {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    mobile: 1,
                    password: 1,
                    image: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    ranking: { $arrayElemAt: ['$ranking', 0] }
                }
            }
        ]).then((response) => {
            console.log(response);
            res.status(200).json(response[0])
        }).catch((err) => {
            next(err)
        })
    }



}