function errorHandler(error, req, res, next){
    console.log(error, 'ERR HANDLER')
    if(error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError"){
        res.status(400).json({message : error.errors[0].message})
    }






    else{
        res.status(500).json({message : 'Internal server error'})
    }
}

module.exports = errorHandler