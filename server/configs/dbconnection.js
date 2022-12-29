const mongoose = require('mongoose')


const db = () => {
    mongoose.connect('mongodb://localhost:27017/chess').then((res) => {
        console.log('database connected');
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = db

