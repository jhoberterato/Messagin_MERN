const userModel = require("../Models/USER")
const bycript = require("bcrypt")
const validator = require("validator")
const jwt = require("jsonwebtoken")

//Generate Token
const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY
    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"})
}

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body
        let user = await userModel.findOne({ email })

        //Check Fields
        if(user) return res.status(400).json("User already exist...")
        if(!name || !email || !password) return res.status(400).json("All fields are required...")
        
        //Validate Fields
        if(!validator.isEmail(email)) return res.status(400).json("Invalid email...")
        if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password...")

        user = new userModel({name, email, password})

        //Hash Password
        const salt = await bycript.genSalt(10)
        user.password = await bycript.hash(user.password, salt)
        
        //Save User
        await user.save()

        const token = createToken(user._id)
        res.status(200).json({
            _id: user._id,
            name,
            email,
            token
        })
    }
    catch(err){
        console.log(`User control error: ${err}`)
        res.status(500).json(err)
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try{
        let user = await userModel.findOne({ email })
        if(!user) return res.status(400).json("Invalid email or password...")
        
        const isValidPassword = await bycript.compare(password, user.password)

        if(!isValidPassword) return res.status(400).json("Invalid email or password...")

        const token = createToken(user._id)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email,
            token
        })
    }
    catch(err){
        console.log(`User control error: ${err}`)
        res.status(500).json(err)
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId
    try{
        let user = await userModel.findById( userId )        
        res.status(200).json(user)
    }
    catch(err){
        console.log(`User control error: ${err}`)
        res.status(500).json(err)
    }
}

const getUsers = async (req, res) => {
    try{
        let users = await userModel.find()        
        res.status(200).json(users)
    }
    catch(err){
        console.log(`User control error: ${err}`)
        res.status(500).json(err)
    }
}

module.exports = { registerUser, loginUser, findUser, getUsers }