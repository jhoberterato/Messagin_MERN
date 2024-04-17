const moongose = require("mongoose")

const chatSchema = new moongose.Schema({
    members: Array,
},{timestamps: true})

const ChatModel = moongose.model("Chat", chatSchema)

module.exports = ChatModel