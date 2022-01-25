const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    __v: {
        type: Number,
        select: false
    }
})

UserSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        delete ret['password']
        return ret
    }
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.method('createJWT', function () {
    return token = jwt.sign({ userID: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
})

UserSchema.method('verifyPassword', async function (candidatePassword) {
    const isPasswordMatch = await bcrypt.compare(candidatePassword, this.password)
    return isPasswordMatch
})

module.exports = mongoose.model('User', UserSchema)