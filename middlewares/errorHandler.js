async function errorHandler(error, req, res, next) {
    try {
        console.log(error);
        let status = 500
        let message = "error on the internal server"
        switch (error.name) {
            case 'InvalidCredentials':
                status = 401
                message = 'check your email and password'
                break;
            case 'forbidden':
                status = 403
                message = 'access is not allowed or not your role'
                break;
            case 'SequelizeValidationError':
                message = error.errors.map(el => {
                    return { message: el.message }
                })
                status = 400
                break;
            case 'error not found':
                status = 404
                message = 'not found the merchandise'
                break;
            case 'unauthorized':
                status = 401
                message = 'email or password error'
                break;
            case 'JsonWebTokenError':
                status = 401
                message = 'you are not logged in'
                break;
        }
        res.status(status).json(message)
    } catch (error) {
        next(error)
    }
}
module.exports = errorHandler