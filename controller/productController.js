const {Customer, Bookmark, Product} = require("../models/index")
const { Op } = require("sequelize");

class producController{

    static async getAllProduct(req, res, next){
        try {
            let { page = 1, brand = "" } = req.query
            let limitData = 9
            let query = {
                where: {
                    brand : {
                        [Op.iLike]: `%${brand}%`
                    }
                },
                order: [["id", "ASC"]],
                limit: limitData
            }
            
            if (page !== "" && typeof page !== 'undefined') {
                query.offset = (page - 1) * 9
            }
            
            const data = await Product.findAndCountAll(query)
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async getProductById(req, res, next){
        try {
            const id = req.params.id
            const data = await Product.findByPk(id)

            if (!data) {
                throw {
                    name : "NotFound"
                }
            }

            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            next(err)
        }
    }
}

module.exports = producController