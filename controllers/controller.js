const { Customer, Shoe, Cart, Transaction } = require('../models')
const { compare, sign } = require('../helpers/helper')
const midtransClient = require('midtrans-client');
const axios = require('axios')

class Controller {
    static async register(req, res, next) {
        try {
            const { email, password, name } = req.body
            let cust = await Customer.create({ email, password, name })
            res.status(201).json({
                id: cust.id,
                email: cust.email
            })
        } catch (err) {
            if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ message: err.errors[0].message })
            }
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email) {
                throw { status: 400, msg: "Email is required" }
            }

            if (!password) {
                throw { status: 400, msg: "Password is required" }
            }

            let user = await Customer.findOne({ where: { email } })

            if (!user) {
                res.status(401).json({ message: "Invalid email/password" })
            } else {
                let isPasswordValid = compare(password, user.password)

                if (!isPasswordValid) {
                    res.status(401).json({ message: "Invalid email/password" })
                } else {
                    const { id, email } = user
                    let token = sign({ id, email })
                    res.status(200).json({ access_token: token })
                }
            }

        } catch (err) {
            if (err.msg) {
                res.status(err.status).json({ message: err.msg });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    static async getShoes(req, res, next) {
        try {
            const data = await Shoe.findAll({
                attributes: { exclude: ["createdAt", "updatedAt"] }
            })
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async getMyCart(req, res, next) {
        try {
            const data = await Cart.findAll({
                where: { CustomerId: req.user.id },
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: {
                    model: Shoe,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }
            })
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
        }
    }

    static async addToCart(req, res, next) {
        try {
            const { shoeId } = req.params

            const findShoes = await Shoe.findOne({ where: { id: shoeId } })

            if (!findShoes) {
                throw { status: 404, msg: "Shoe not found" }
            }

            const findCart = await Cart.findOne({
                where: { ShoeId: findShoes.id, CustomerId: req.user.id },
                include: {
                    model: Shoe,
                    attributes: { exclude: ["createdAt", "updatedAt"] }
                }
            })

            if (!findCart) {
                const data = await Cart.create({
                    CustomerId: req.user.id,
                    ShoeId: shoeId,
                    quantity: 1,
                    totalPrice: findShoes.price
                })
                res.status(201).json({ message: `Success add to cart!` })
            } else {
                const data = await Cart.update(
                    {
                        quantity: findCart.quantity + 1,
                        // totalPrice: findCart.totalPrice + findCart.dataValues.Shoe.dataValues.price
                        totalPrice: findCart.totalPrice + findShoes.price
                    },
                    { where: { id: findCart.id } }
                )
                res.status(201).json({ message: `Success add to cart!` })
            }

        } catch (err) {
            console.log(err);
            if (err.msg) {
                res.status(err.status).json({ message: err.msg });
            } else {
                res.status(500).json({ message: "Internal server error" });
            }
        }
    }

    static async midtransToken(req, res, next) {
        let findMyCart = await Cart.findAll({
            where: { CustomerId: req.user.id }
        })

        let total = 0

        findMyCart.forEach((el) => {
            total += el.totalPrice
        });

        try {
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "ORDERID_" + Math.floor(1000000 + Math.random() * 9000000), //randomized
                    "gross_amount": total //kalkulasi total harga + ongkir
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    "email": req.user.email,
                    // "phone": "08111222333"
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            // console.log(midtransToken, '<<<< midtrans token');
            res.status(201).json(midtransToken)

        } catch (err) {
            console.log(err);
        }
    }

    static async checkOngkir(req, res, next) {
        try {
            const { origin, destination, weight, courier } = req.body
            const { data } = await axios({
                method: 'POST',
                url: 'https://api.rajaongkir.com/starter/cost',
                headers: {
                    key: '563ae86d45c1395b9ba944125ec69ce0'
                },
                data: { origin, destination, weight, courier }
            })
            res.status(200).json(data.rajaongkir)

        } catch (err) {
            console.log(err);
        }
    }

    static async reduceCart(req, res, next) {
        try {
            const { cartId } = req.params

            const findCart = await Cart.findOne({ where: { id: cartId } })

            if (!findCart) {
                throw { status: 404, msg: "Cart not found" }
            }

            if (findCart.quantity > 1) {
                const data = await Cart.update(
                    { quantity: findCart.quantity -  1 },
                    { where: {id: cartId}}
                );
                res.status(200).json({ message: "Item reduced from cart"})
            } else {
                const data = await Cart.destroy({ where: {id: cartId}});
                res.status(200).json({ message: "Item removed from cart"})
            }


        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
}

module.exports = Controller