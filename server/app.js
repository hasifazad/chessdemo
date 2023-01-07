require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./configs/dbconnection.js')

app.use(cors())
app.use(express.json())

const chatRoute = require('./routes/chat.js')
const converstaionRoute = require('./routes/conversation.js')
const userRoute = require('./routes/user.js')
const rankingRoute = require('./routes/ranking.js')
const gameRoute = require('./routes/game.js')


const PORT = process.env.PORT


db()




app.use('/api/chat', chatRoute)
// app.use('/api/conversation', converstaionRoute)
app.use('/api/user', userRoute)
app.use('/api/ranking', rankingRoute)
app.use('/api/game', gameRoute)


app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err)
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('server connected on port ' + PORT);
    }
})
