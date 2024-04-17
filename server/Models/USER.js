const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 200,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 1024
    },
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", schema)
module.exports = UserModel