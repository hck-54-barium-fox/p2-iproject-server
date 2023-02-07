function errorHandler(err, req, res, next) {
    console.log(err)
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        const message = err.errors.map((perData) => { return { error: perData.message } })
        res.status(400).json(message)
    }else if (err.message === 'data not found') {
        res.status(404).json({ message: "data not found" })
    }else if (err.message === 'invalid email or password') {
        res.status(401).json({ message: "invalid email or password" })
    }else if (err.message === 'password is required') {
        res.status(400).json({ message: "password is required" })
    }else if (err.message === 'email is required') {
        res.status(400).json({ message: "email is required" })
    } else if (err.message === 'forbidden to access') {
        res.status(403).json({ message: "You are not authorized" })
    } else if (err.message === 'invalid Token' || err.name === "JsonWebTokenError") {
        // console.log(err)
        res.status(401).json({ message: "Invalid token" })
    } else {
        res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = errorHandler