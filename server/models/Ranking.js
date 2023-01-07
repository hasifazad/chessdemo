const mongoose = require('mongoose')
const { number } = require('yup')

const ranking = new mongoose.Schema({
    win: {
        type: Number
    },
    lose: {
        type: Number
    },
    draw: {
        type: Number
    },
    point: {
        type: Number
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