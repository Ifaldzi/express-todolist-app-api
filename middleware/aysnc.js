const asyncWrapper = (fn) => {
    return async (req, res) => {
        try {
            await fn(req, res)
        } catch (error) {
            return res.status(500).json({
                success: false,
                error
            })
        }
    }
}

module.exports = asyncWrapper