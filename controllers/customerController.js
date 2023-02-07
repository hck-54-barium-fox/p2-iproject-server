const {Customer} = require('../models/index')

class CustomerController {
    
    static async register(req, res, next){
        try {
            let {email, password} = req.body

            let result =  await Customer.create({email, password})
            // console.log(result)
            res.status(201).json({id: result.id, email})
            
        } catch (error) {
            // console.log(error)
            next(error)
        }
    }
    
}

module.exports = CustomerController