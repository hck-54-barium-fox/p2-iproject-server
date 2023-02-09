const { Item, User, Category } = require('../models')

class ItemController {

    static async readItems(req, res, next) {
        try {
            let itemsData = await Item.findAll({
                include: [User, Category]
            })
            res.status(200).json(itemsData)
        } catch (error) {
            next(error)
        }
    }

    static async readCompactDisc(req, res, next) {
        try {
            let itemsData = await Item.findAll({
                where: {
                    CategoryId: 2,
                },
                include: [Category]

            })
            res.status(200).json(itemsData)
        } catch (error) {
            next(error)
        }
    }

    // static async detailCompactDisc(req, res, next) {
    //     try {
    //         let dataCD = await Item.findOne({
    //             where: {
    //                 CategoryId: 2,
                    
    //             },
    //             include: []
    //         })
    //         if (dataCD) {
    //             res.status(200).json(dataCD)
    //         } else {
    //             throw new Error('error not found')
    //         }
    //     } catch (error) {
    //         next(error)
    //     }
    // }

    static async readTShirt(req, res, next) {
        try {
            let itemsData = await Item.findAll({
                where: {
                    CategoryId: 1,
                },
                include: [Category]

            })
            res.status(200).json(itemsData)
        } catch (error) {
            next(error)
        }
    }

    static async addItems(req, res, next) {
        try {
            let createData = await Item.create({
                name: req.body.name,
                stock: req.body.stock,
                price: req.body.price,
                itemUrl: req.body.itemUrl,
                UserId: req.body.UserId,
                description: req.body.description
            })
            res.status(201).json(createData)
        }
        catch (err) {
            console.log(err);
            next(err)
        }
    }

    static async detailsItem(req, res, next) {
        try {
            let detailData = await Item.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (detailData) {
                res.status(200).json(detailData)
            } else {
                throw new Error('error not found')
            }
        }
        catch (err) {
            next(err)
        }
    }

    static async destroyItem(req, res, next) {
        try {
            let itemData = await Item.findOne({ where: { id: req.params.id } })
            if (itemData) {
                await Movie.destroy(
                    { where: { id: req.params.id } }
                )
                res.status(200).json({ message: 'Item success to delete.' })
            } else { throw new Error('error not found') }
        }
        catch (err) {
            next(err)
        }
    }

    static async editItem(req, res, next) {
        try {
            let item_id = req.params.id
            let editData = await Item.update({
                name: req.body.name,
                stock: req.body.stock,
                price: req.body.price,
                itemUrl: req.body.itemUrl,
                UserId: req.body.UserId,
                description: req.body.description
            }, {
                where: {
                    id: item_id
                }
            })
            res.status(201).json({ message: 'edit succes full' })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ItemController