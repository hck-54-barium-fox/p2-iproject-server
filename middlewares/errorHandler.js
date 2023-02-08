async function errorHandler(err, req, res, next) {
    switch (err.name) {
        case "Not found":
            res.status(404).json({ message: "Data Not Found" })
            break;
        case "SequelizeValidationError":
            let errors = err.errors.map((el) => {
                return { message: el.message }
            })
            res.status(400).json(
                errors
            )
            break;
        case "SequelizeUniqueConstraintError":
            let error = err.errors.map((el) => {
                return { message: el.message }
            })
            res.status(400).json(
                error
            )
            break;
        case "Invalid login":
            res.status(401).json({
                message: "Invalid email or password"
            })
            break;
        case "already subscribe":
        res.status(400).json({
            message: "already subscribe"
        })
            break;
        case "Data not found":
            res.status(404).json({
                message: "News not found, please try again"
            })
            break;
        case "Unauthorized":
            res.status(403).json({
                message: "Forbidden access"
            })
            break;
        case "Invalid token":
            res.status(401).json({
                message: "Invalid token"
            })
            break;
        case "MidtransError":
                res.status(400).json({
                    message:err.ApiResponse.error_message[0]
                })
                break;
        default:
            res.status(500).json({
                message: "Error"
            })
            break;

    }
}

module.exports = errorHandler