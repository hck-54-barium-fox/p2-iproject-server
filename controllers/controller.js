const { log } = require('console')
const {User} = require('../models/index')


class Controller{
    static async register(req, res, next){
        try {
            let {email, password} = req.body
            let user = await User.create({
                email,
                password
            })
            res.status(201).json(user)
        } catch (error) {
            console.log(error);
            next(error)
        }

    }
}

module.exports = Controller