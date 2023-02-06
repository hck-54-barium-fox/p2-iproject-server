
function errorHandler (err, req, res, next) {

    if (err.name === 'SequelizeValidationError' ) {
        let errors = err.errors.map(el => {
            return {message: el.message}
        })
        res.status(400).json(errors)
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(400).json({message: err.errors[0].message})
    } else if (err.name === 'JsonWebTokenError') {
        res.status(401).json({message: "Invalid token"})
    } else if (!err.code !== 500) {
        res.status(err.code).json({message: err.msg})
    } else {
        res.status(500).json({message: "Internal server error"})
    }
}

  module.exports = errorHandler