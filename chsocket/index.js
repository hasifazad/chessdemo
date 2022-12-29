const server = require('socket.io')


const io = server(8901, {
    cors: {
        origin: '*'
    }
})

let users = []
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId })
}

io.on('connection', (socket) => {
    console.log('chess socket conected');

    socket.on('move', (m, k) => {
        console.log(m, k);
        io.emit('make', m, k)
    })




    socket.on('disconnect', () => {
        console.log('chess socket disconnected');
    })
})