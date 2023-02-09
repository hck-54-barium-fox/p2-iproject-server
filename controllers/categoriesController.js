const { Category, Item } = require('../models')

class CategoriesController {

    static async readCategories(req, res, next) {
        try {
            let data = await Category.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }



}

module.exports = CategoriesController