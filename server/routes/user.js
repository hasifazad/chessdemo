const router = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { signupSchema, loginSchema, validation } = require('../middlewares/validation')




router.post('/signup', validation(signupSchema), (req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10).then(async (hash) => {
            const user = await User.create({
                username: req.body.username,
                email: req.body.email,
                mobile: req.body.email,
                password: hash
            })
            user.save()
            res.status(200).json('signup successful')

        }).catch((err) => {
            console.log(err);
            res.status(400).json('email already exist')
        })
    } catch (error) {
        next(error)
    }

})

router.post('/login', validation(loginSchema), async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.find({ email: req.body.email })
        if (user.length !== 0) {
            bcrypt.compare(req.body.password, user[0].password).then((result) => {
                if (result) {
                    jwt.sign({ password: req.body.password }, 'chess', (err, token) => {
                        console.log(token);
                        res.status(200).json({ user: user[0], token })
                    })
                } else {
                    throw 'wrong password'
                }
            }).catch((err) => {
                console.log('blhaaaa', err)
                res.status(400).json(err)
            })
        } else {
            res.status(400).json('email not exist')
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/verify/:token', (req, res) => {
    console.log(req.params);
    jwt.verify(req.params.token, 'chess', (err,response) => {
        console.log(response);
    })
})

router.get('/all-users', async (req, res, next) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        next(error)
    }
})


module.exports = router