const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    nickname:   String,
    status: Number,
    token: String,
    vk_token: String
})

module.exports = model('User', UserSchema)