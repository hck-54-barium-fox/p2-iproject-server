function errHandler(err, req, res, next){
    if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" ){
        res.status(400).json({message : err.errors[0].message})
    }else if(err.name === "badRequestEmail"){
        res.status(400).json({message : "Email is required"})
    }else if(err.name === "badRequestPassword"){
        res.status(400).json({message : "Password is required"})
    }else if(err.name === "Unauthorized"){
        res.status(401).json({message : "Email / Password Invalid"})
    }else if(err.name === "InvalidToken"){
        res.status(401).json({message : "Invalid Token"})
    }else{
        res.status(500).json({message : "Internal Server Error"})
    }
}

module.exports = errHandler