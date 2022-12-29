const yup = require('yup')

const signupSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup.string().min(10).max(10).required(),
    password: yup.string().min(3).required()
})

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required()
})


function validation(schema) {
    return async (req, res, next) => {
        console.log(req.body);
        const body = req.body
        try {
            await schema.validate(body)
            next()
        } catch (error) {
            console.log(error);
            res.status(400).json({ error })
        }
    }
}

module.exports = { signupSchema, validation ,loginSchema}