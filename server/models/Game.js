const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
    {
        first_player: {
            id: { type: mongoose.SchemaTypes.ObjectId },
            color: { type: String }
        },
        second_player: {
            id: { type: mongoose.SchemaTypes.ObjectId },
            color: { type: String }
        },
        moves: {
            type: []
        },
        fen: {
            type: []
        },
        time: {
            type: Number
        },
        add_to_ranking: {
            type: Boolean
        }
    },
    { timestamps: true }
)



module.exports = mongoose.model('Game', gameSchema)