const chatModel = require("../Models/CHAT")

// createChat
// findUserChats
// findChat

const createChat = async (req, res) => {
    const {firstId, secondId} = req.body
    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        })

        // check if convo exist
        if(chat) return res.status(200).json(chat)

        // else create new one
        const newChat = new chatModel({
            members: [firstId, secondId]
        })

        const response = await newChat.save()
        res.status(200).json(response)
    }
    catch(err){
        console.log(`Chat control error: ${err}`)
        res.status(500).json(err)
    }
}

const findUserChats = async (req, res) => {
    const userId = req.params.userId
    try{
        const chats = await chatModel.find({
            members: {$in: [userId]}
        })
        res.status(200).json(chats)
    }
    catch(err){
        console.log(`Chat control error: ${err}`)
        res.status(500).json(err)
    }
}

const findChat = async (req, res) => {
    const {firstId, secondId} = req.params
    try{
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        })
        res.status(200).json(chat)
    }
    catch(err){
        console.log(`Chat control error: ${err}`)
        res.status(500).json(err)
    }
}

module.exports = {createChat, findUserChats, findChat}

