const errorHandler = (err, req, res, next) => {
    console.log('masuk err handler');

    if (err.name === 'SequelizeUniqueConstraintError') {
        let output = err.errors.map(el => {
        return el.message
    })
    res.status(400).json({ message: output.join(', ') })

}
else if (err.name === 'SequelizeValidationError' || err.name === 'ValidationErrorItem') {
    let output = err.errors.map(el => {
        return el.message
    })
    res.status(400).json({ message: output.join(', ') })
    
}
}


module.exports = errorHandler