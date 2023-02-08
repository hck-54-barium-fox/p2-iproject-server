const{Product,Category,MyProduct,User} = require('../models/index')
const midtransClient = require("midtrans-client");
let totalHarga = 0
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
                where : {
                    id : req.params.id
                }
            })
            console.log(data);
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
    static async addProduct(req,res) {
        try {
            const UserId = req.user.id
            const ProductId = req.params.id
            console.log(req.params.id);
            const data = await Product.findOne({
                where : {
                    id: ProductId
                }
            })
            if(!data) {
                throw {
                    name : 'product not found'
                }
            }
            const dataProduct = await MyProduct.create({
                UserId,
                ProductId
            })
            res.status(201).json(dataProduct)
        } catch (error) {
            console.log(error);
        }
    }
    static async readMyproduct(req,res) {
        try {
            const UserId = req.user.id
            const data = await MyProduct.findAll({
                where : {
                    UserId
                },
                include : Product
            })
            if(!data) {
                throw {
                    name : 'Myproduct not found'
                }
            }
            // console.log(data[0]);
            totalHarga += data[0].Product.price
            // console.log(totalHarga);
            // totalHarga
            // totalHarga = 0
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async generateToken(req, res, next) {
        // const { cost } = req.query;

        try {
            const findUser = await User.findOne({
                where: { id: req.user.id },
            });
            const dataProduct = await Product.findOne({
                where :{
                    id: req.user.id
                }
            }) 
            // console.log(dataProduct,'<<<<<');
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: "SB-Mid-server-8uJUTcvTDHBJodGBlfVLfDkg",
            });
           
            let parameter = {
                transaction_details: {
                    order_id:
                        "TRANSACTION" +
                        Math.floor(1000000 + Math.random() * 9000000),
                    gross_amount: totalHarga, //kalkulasi harga bisa juga dapat dari parameter query
                },
                credit_card: {
                    secure: true,
                },
                customer_details: {
                    email: findUser.email,
                    name: findUser.name,
                },
            };
            const midtransToken = await snap.createTransaction(parameter);
            // console.log(midtransToken,'dari midtrans');
            res.status(201).json(midtransToken);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
   static async successPayment(req,res) {
        try {
            console.log(req.user,'<<<');
            const data = await MyProduct.findAll({
                where : {
                    UserId : req.user.id
                }
            })
            if(!data) {
                throw {
                    name : 'Myproduct not found'
                }
            }
            console.log(data,'<<<<<<');
            const success = MyProduct.destroy({
                where : {
                    UserId : req.user.id
                }
            }) 
            res.status(201).json({
                message: 'succes pay'
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller