const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    gender: {
        type: String,
       
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar : {
        type: String
    }
});

var User = mongoose.model('User', userSchema);

module.exports = User;