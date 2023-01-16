const mongoose = require('mongoose')
const { number } = require('yup')

const ranking = new mongoose.Schema({
    win: {
        type: Number,
        default: 0
    },
    lose: {
        type: Number,
        default: 0
    },
    draw: {
        type: Number,
        default: 0
    },
    point: {
        type: Number,
        default: 0
    }
})


const rankingSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.SchemaTypes.ObjectId
        },
        ranking: ranking
    },
    { timestamps: true }
)


module.exports = mongoose.model('Rankings', rankingSchema)