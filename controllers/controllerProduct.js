const{Product,Category} = require('../models/index')

class Controller {
    static async getallproduct(req,res,next) {
        try {
            const data = await Product.findAll({
                include : Category
            }) 
            res.status(201).json(data)
        } catch (error) {
            // console.log(error);
            next(error)
        }
    }
    static async detailProduct(req,res,next) {
        try {
            const data = await Product.findOne({
                id : req.params.id
            })
            if(!data) {
                throw {
                    name : 'product not found'
                }
            }
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}

module.exports = Controller