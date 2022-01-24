const {CustomError} = require('../errors/CustomError')

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        console.log('errror');
        return res.status(err.statusCode).json({
            success: false,
            error: err.message
        })
    } else {
        return res.status(500).json({
            success: false,
            error: 'Something went wrong, please try again later!'
        })
    }
}

module.exports = errorHandler