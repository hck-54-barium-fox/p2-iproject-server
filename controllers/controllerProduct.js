const{Product,Category,MyProduct,User} = require('../models/index')
const midtransClient = require("midtrans-client");
const rajaongkir = process.env.RAJAONGKIR_API_KEY;
const axios = require("axios");
const sendEmail2 = require('../helper/nodemailer2');
// sendEmail2
let totalHarga = 0
let totalOngkir = 0
class Controller {
    static async getallproduct(req,res,next) {
        try {
            const data = await Product.findAll({
                include : Category
            }) 
            // this.readMyproduct()
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
            // const {email} = req.body
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
                    gross_amount: totalHarga + totalOngkir , //kalkulasi harga bisa juga dapat dari parameter query
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
            // sendEmail2(email)
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
    static async getProvince(req, res, next) {
        try {
            const province = await axios
                .get("https://api.rajaongkir.com/starter/province", {
                    headers: { key: rajaongkir },
                })
                .then((response) => {
                    return response.data.rajaongkir.results;
                })
                .catch((err) => {
                    throw err;
                });
            res.status(200).json(province);
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }
    static async getCity(req, res, next) {
        try {
            const { id } = req.params;
            // console.log(req.params);
            const city = await axios
                .get("https://api.rajaongkir.com/starter/city", {
                    params: { province: id },
                    headers: { key: rajaongkir },
                })
                .then((response) => {
                    return response.data.rajaongkir.results;
                })
                .catch((err) => {
                    throw err;
                });
            res.status(200).json({ data: city });
        } catch (error) {
            next(error);
        }
    }
    static async getCost(req, res, next) {
        try {
            let courier = "jne";
            const { destination } = req.query;
            const data = {
                origin: "291",
                destination,
                weight: 1000,
                courier,
            };
            const cost = await axios({
                method: "POST",
                url: "https://api.rajaongkir.com/starter/cost",
                data,
                headers: { key: rajaongkir },
            });
            // console.log(cost.data.rajaongkir.results[0].costs[0].cost[0].value,'<<<<');
            const result = cost.data;
            totalOngkir += cost.data.rajaongkir.results[0].costs[0].cost[0].value
            res.status(200).json(result);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = Controller