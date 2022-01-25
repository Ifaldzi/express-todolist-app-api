const User = require('../models/User')
const asyncWrapper = require('../middleware/aysnc')
const { createCustomError } = require('../errors/CustomError')

const register = asyncWrapper(async (req, res) => {
    console.log(req.body);
    const user = await User.create(req.body)
    const token = user.createJWT()
    res.status(201).json({
        success: true,
        data: { user, token }
    })
})

const login = asyncWrapper(async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({username: username})

    if (!user) {
        return next(createCustomError('User not found', 400))
    }

    const isPasswordCorrect = await user.verifyPassword(password)
    if (!isPasswordCorrect) {
        return next(createCustomError('Credentials not match', 400))
    }

    const token = await user.createJWT()

    return res.status(200).json({
        success: true,
        data: {
            user, token
        }
    })
})

module.exports ={ 
    register,
    login,
}