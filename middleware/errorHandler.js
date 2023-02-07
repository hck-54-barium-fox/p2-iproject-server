function errHandler(err, req, res, next){
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" ){
        res.status(400).json({message : err.errors[0].message})
    }
}

module.exports = errHandler