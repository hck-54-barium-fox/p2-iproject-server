function errorHandler(err, req, res, next) {
    let code
    let message

    if (err.name === "SequelizeUniqueConstraintError" ||
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeDatabaseError") {
        err.errors.forEach(el => {
            message = el.message
        })
        code = 400
    } else if (err.name === "InvalidLogin") {
        message = "Error login user not found or password not matched or username not filled up"
        code = 401
    } else if (err.name === "InvalidToken") {
        message = "Error authentication"
        code = 401
    } else if (err.name === "Forbidden") {
        message = "Forbidden error at authorization"
        code = 403
    } else if (err.name === "NotFound") {
        message = "Data not found"
        code = 404
    } else if (err.name === "MovieNotFound") {
        message = "Movie Not Found"
        code = 404
    } else if(err.name ===  "InvalidBookmark"){
        message = "You have already bookmark this movie"
        code = 400
    } else if (err.name === "JsonWebTokenError"){
        message ="Invalid Token"
        code = 401
    }else {
        message = "internal server error"
        code = 500
    }

    res.status(code).json({
        message
    })
}

module.exports = errorHandler

