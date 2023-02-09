const errorHandler = (err, req, res, next) => {
    // console.log('masuk err handler');
    console.log(err, 'dari err handler ni bos', new Date());
    // console.log(err.name, 'err.name >>>>>>>>>>>>>>>>>>>>>>>>>');

    if (err.name === 'SequelizeUniqueConstraintError') {
        let output = err.errors.map(el => {
            return el.message
        })
        res.status(400).json({ message: output.join(', ') })

    }
    else if (err.name === 'SequelizeDatabaseError') {
        res.status(400).json(err)
    }



    else if (err.name === 'SequelizeValidationError' || err.name === 'ValidationErrorItem') {
        let output = err.errors.map(el => {
            return el.message
        })
        res.status(400).json({ message: output.join(', ') })

    }
    else if (err.name === "invalid username/password") {

        res.status(404).json({ message: "Unauthorized" })
    }

}


module.exports = errorHandler