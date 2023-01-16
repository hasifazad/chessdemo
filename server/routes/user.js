const router = require('express').Router()
const multer = require('multer')
const upload = require('../middlewares/multer')

const { signupSchema, loginSchema, validation } = require('../middlewares/validation')
const { signup, login, getUsers, verifyToken, setProfilePic, getProfile } = require('../contollers/UserController')


router.post('/signup', validation(signupSchema), signup)

router.post('/login', validation(loginSchema), login)

router.get('/verify/:token', verifyToken)

router.get('/all-users', getUsers)

router.post('/set-dp', upload.single('avatar'), setProfilePic)

router.get('/get-user-profile/:userId', getProfile)




module.exports = router