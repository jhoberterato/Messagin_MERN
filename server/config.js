const mongoose = require("mongoose")
const url = process.env.ATLAS_URL

mongoose.connect(url).then(() => {
    console.log("MongoDB connection established")
}).catch((err) => {
    console.log(`MongoDB connection failed: ${err.message}`)
})