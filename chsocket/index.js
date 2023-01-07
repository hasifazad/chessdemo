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

io.on('connection', (socket) => {
    console.log('chess socket connected');
    socket.on('addUser', (userId, matchLink) => {
        addUser(userId, socket.id, matchLink)
        console.log(users);
    })
    // socket.on('move', ({ senderId, recieverId, position, mov }) => {
    //     const user = getUser(recieverId)
    //     try {
    //         io.to(user.socketId).emit('make', {
    //             id: senderId,
    //             pos: position,
    //             mo: mov

    //         })
    //     } catch (error) {

    //     }
    // })
    socket.on('setmove', ({ sender, aMove, aFen, matchLink }) => {
        // console.log(sender, reciever, aMove, aFen);
        const user = getUser(sender, matchLink)
        console.log(user);
        try {
            io.to(user.socketId).emit('getmove', {
                id: sender,
                aMove,
                aFen
            })
        } catch (error) {

        }
        // try {
        //     io.to(user.socketId).emit('make', {
        //         id: sender,
        //         pos: position,
        //         mo: mov

        //     })
        // } catch (error) {

        // }
    })

    // socket.on('move', (position, mov) => {
    //     console.log(m, k);
    //     io.emit('make', position, mov)
    // })




    socket.on('disconnect', () => {
        console.log('chess socket disconnected');
        removeUser(socket.id)
        // socket.emit('getuser', users)
    })

})
