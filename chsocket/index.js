const server = require('socket.io')


const io = server(8901, {
    cors: {
        origin: '*'
    }
})

let users = []
const addUser = (userId, socketId, matchLink) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId, matchLink })
}

const getUser = (userId, link) => {
    return users.find((user) => user.userId != userId && user.matchLink == link)
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getPlayers = (matchLink) => {
    return users.filter((user) => user.matchLink === matchLink)
}

io.on('connection', (socket) => {
    console.log('chess socket connected');
    socket.on('addUser', (userId, matchLink) => {
        addUser(userId, socket.id, matchLink)
        let players = getPlayers(matchLink)
        try {
            if (players.length == 2) {
                for (let i = 0; i < 2; i++) {
                    io.to(players[i].socketId).emit('startgame', { start_game: true })
                }
            } else {
                console.log('start game false');
            }
        } catch (error) {
            console.log(error);
        }
        console.log(users);
    })

    socket.on('setmove', ({ sender, aMove, aFen, matchLink }) => {
        const user = getUser(sender, matchLink)
        try {
            io.to(user.socketId).emit('getmove', {
                id: sender,
                aMove,
                aFen
            })
        } catch (error) {

        }
    })




    socket.on('disconnect', () => {
        console.log('chess socket disconnected');
        removeUser(socket.id)
    })

})
