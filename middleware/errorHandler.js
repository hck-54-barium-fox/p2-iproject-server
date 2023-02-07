function errHandler(err, req, res, next){
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" ){
        res.status(400).json({message : err.errors[0].message})
    }else if(err.name === "badRequestEmail"){
        res.status(400).json({message : "Email is required"})
    }else if(err.name === "badRequestPassword"){
        res.status(400).json({message : "Password is required"})
    }else if(err.name === "Unauthorized"){
        res.status(401).json({message : "Email / Password Invalid"})
    }
}

module.exports = errHandler