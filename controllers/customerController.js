const { compare } = require('../helpers/brcypt')
const { signToken } = require('../helpers/jwt')
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

    static async login(req, res, next){
        try {
            let {email, password} = req.body

            if(!email){
                throw({code: 400, message : 'Email is required'})
            }else if(!password){
                throw({code : 400, message : 'Password is required'})
            }

            let customer = await Customer.findOne({where : {email}})
            console.log(customer)

            if(!customer){
                throw({code : 401, message : "Invalid email or password"})
            }

            let comparePass = compare(password, customer.password)

            if(!comparePass){
                throw({code : 401, message : "Invalid email or password"})
            }

            req.customer = ({id: customer.id, email:customer.email})
            let access_token = signToken({id:customer.id, email})

            // console.log(access_token)
            res.status(200).json({access_token})
            
        } catch (error) {
            // console.log(error)
            next(error)
        }
    }
    
}

module.exports = CustomerController