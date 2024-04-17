const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute = require("./Routes/messageRoute")

require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/users", userRoute)
app.use("/api/chats", chatRoute)
app.use("/api/messages", messageRoute)

const url = process.env.ATLAS_URL
const port = process.env.PORT || 5000

app.listen(port, (err) => {
    if(!err){
        console.log(`Running on port ${port}.`)
    }
    else{
        console.log(`Error : ${err}`)
    }
})

mongoose.connect(url).then(() => {
    console.log("MongoDB connection established")
}).catch((err) => {
    console.log(`MongoDB connection failed: ${err.message}`)
})
