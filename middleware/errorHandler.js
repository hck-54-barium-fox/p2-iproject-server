function errorHandler(err, req, res, next) {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({
            errorsMessages: err.errors.map(el => ({ message: el.message }))
        })
    } else if (err.code) {
        res.status(404).json({
            message: 'Player Not Found'
        })
    }
    else if (err.name === 'JsonWebTokenError') {
        res.status(401).json({
            message: 'Invalid access token'
        })
    } else if (err.status) {
        res.status(err.status).json({ message: err.msg })
    } else {
        console.log(err)
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = { errorHandler }