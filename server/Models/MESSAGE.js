const moongose = require("mongoose")

const messageSchema = new moongose.Schema({
    chatId: String,
    senderId: String,
    text: String,
}, {timestamps: true})

const messageModel = moongose.model("Messages", messageSchema)

module.exports = messageModel