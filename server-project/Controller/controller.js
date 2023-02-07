const {User} = require("../models/index");

class Controller{

    static async register(req,res){
        try{
         let {email,password,username} =req.body
         let  dataRegister = await  User.create({
            email,
            password,
            username
         })
         let dataResult = {
            id:dataRegister.id,
            email:dataRegister.email,
            username:dataRegister,username
         }
         res.status(200).json(dataResult)
        }catch(err){    
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ message: err.errors[0].message })
            } else if (err.name === "SequelizeValidationError") {
                res.status(400).json({ message: err.errors[0].message })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    } 

}
module.exports = Controller