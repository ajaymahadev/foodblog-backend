const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// model name is 'User' and its a string------->  mongoose.model('User',userSchema)


module.exports=mongoose.model('User',userSchema)



//run-----> node app

// server is running at port 4000
// connected to database....!!!