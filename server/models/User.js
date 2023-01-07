const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        mobile: {
            type: String
        },
        password: {
            type: String
        },
        image: {
            type: String,
            default:null
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Users', userSchema)