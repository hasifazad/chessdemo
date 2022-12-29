const server = require('socket.io')


const io = server(8900, {
    cors: {
        origin: '*'
    }
})

let users = []
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
    console.log('blhaaaa',userId);
    return users.find((user) => user.userId == userId)
}

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('adduser', (userId) => {
        console.log(userId, '  ', socket.id);
        addUser(userId, socket.id)
        socket.emit('getuser', users)
    })

    socket.on('sendmessage', ({ senderId, recieverId, text }) => {
        console.log(senderId, recieverId, text);
        const user = getUser(recieverId)
        console.log(user);
        io.to(user.socketId).emit('getmessage', {
            senderId,
            text

        })
    })



    socket.on('disconnect', () => {
        console.log('disconnected');
        removeUser(socket.id)

        socket.emit('getuser', users)
    })
})