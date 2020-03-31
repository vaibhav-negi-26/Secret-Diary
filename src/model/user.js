const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is already taken!!")
            }
        }
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 8,
    },
    tokens : [{
        token: {
            type: String,
            require: true
        }
    }]
})

// virtual schema for linking task and users
UserSchema.virtual('sequel', {
    ref: 'Diary',
    localField: '_id',
    foreignField: 'owner'
})

// removing private data from user obj before sending response back to user
UserSchema.methods.toJSON = function () {
    const user = this
    const userObj = user.toObject()

    delete userObj.tokens
    delete userObj.password
    delete userObj.__v

    return userObj
}

// generating auth tokens
UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id }, 'myFirstNodeApp')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


// creating login function for model
UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    })
    if (!user) {
        throw new Error('Unable to login!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login!')
    }
    return user
}

// middleware
UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User