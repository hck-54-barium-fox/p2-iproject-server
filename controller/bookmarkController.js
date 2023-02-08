const { Customer, Bookmark, Product } = require("../models/index")
const midtransClient = require('midtrans-client');

const formatRupiah = require("../helper/formatRupiah")

class BookmarkController {

    static async getAllBookmark(req, res, next) {
        try {
            const id = req.customer.id

            const options = {
                where: {
                    CustomerId: id
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            };

            const data = await Bookmark.findAll(options)
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async createBookmark(req, res, next) {
        try {
            const customerId = +req.customer.id
            const id = +req.params.productId

            const data = await Product.findOne({
                where: {
                    id
                }
            })

            if (!data) {
                throw {
                    name: "NotFound"
                }
            }


            let dataBookmark = {
                ProductId: id,
                CustomerId: customerId
            }

            const [isData, create] = await Bookmark.findOrCreate({
                where: {
                    ProductId: dataBookmark.ProductId,
                    CustomerId: dataBookmark.CustomerId
                },
                defaults: dataBookmark,
                // hooks: false,
            })
            if (!create) {
                throw {
                    name: "InvalidBookmark"
                }
            }
            console.log(isData);
            res.status(201).json({
                id: isData.id,
                ProductId: isData.ProductId,
                CustomerId: isData.CustomerId
            })

        } catch (err) {
            next(err)
        }
    }

    static async destroyBookmark(req, res, next) {
        try {
            const id = +req.params.bookmarkId

            const data = await Bookmark.findOne({
                where : {
                    id
                }
            })
            await data.destroy()
            
            res.status(200).json({
                message : ` id ${data.id} has been deleted`
            })
        } catch (err) {
            console.log(err.name);
            next(err)
        }
    }

    static async countBookmark(req, res, next){
        try {
            
            const customerId = req.customer.id
            const id = +req.params.productId

            const data = await Bookmark.findAll({
                where : {
                    CustomerId : customerId
                },
                include : {
                    model : Product
                }
            })
            let totalPrice = 0
            data.forEach(el => {
                totalPrice += el.Product.product_price
            })
            
            res.status(200).json(formatRupiah(totalPrice))
        } catch (err) {
            next(err)
        }
    }

    static async generateMidtrans(req, res, next){
        try {
            const customerId = req.customer.id
            const id = +req.params.productId
            
            const dataCust = await Customer.findByPk(customerId)
            const dataProduct = await Product.findByPk(id)

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction : false,
                serverKey : process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                transaction_details: {
                  order_id: `TRANSACTION_${Math.floor(1000 + Math.random() * 10000)}`, // must be unique
                  gross_amount: dataProduct.product_price,
                },
                credit_card: {
                  secure: true,
                },
                customer_details: {
                    username : dataCust.username ,
                    email : dataCust.email,
                    product : dataProduct.product_name
                },
              };
              const tokenMidtrans = await snap.createTransaction(parameter);
              res.status(201).json(tokenMidtrans);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = BookmarkController