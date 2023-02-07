const errorHandler = (err,req,res,next) => {
    console.log(err);
    if(err.name ==='SequelizeValidationError') {
        res.status(400).json({
            message : err.errors[0].message
        })
    }
    else if(err.name ==='SequelizeUniqueConstraintError') {
        res.status(400).json({
            message : err.errors[0].message
        })
    } else {
        res.status(500).json({
            message:'internal server error'
        })
    }
}


module.exports = errorHandler
