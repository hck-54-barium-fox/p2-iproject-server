const axios = require("axios");
const { Product, Cart } = require('../models/index');
const midtransClient = require('midtrans-client');


class ProductController {

    static async getCPU(req, res) {
        try {
            const data = await Product.findAll({ where: { type: 'Processor' } })
            // console.log(dataProc.length);
            if (data.length > 0) {
                // console.log('sini brayyy kont');

                res.status(200).json(data)
            } else {
                // console.log('sini bro');
                const currencyAPI = async (price) => {
                    const { data: val } = await axios({
                        method: 'GET',
                        url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
                        params: { have: 'USD', want: 'IDR', amount: price },
                        headers: {
                            'X-RapidAPI-Key': '694730de7bmshfb067e0019ac1cdp1f7aa4jsna7927f57bec2',
                            'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
                        }
                    })
                    return val.new_amount
                }

                const { data: processors } = await axios({
                    method: 'GET',
                    url: 'https://computer-components-api.p.rapidapi.com/processor',
                    params: { limit: '20', offset: '0' },
                    headers: {
                        'X-RapidAPI-Key': '694730de7bmshfb067e0019ac1cdp1f7aa4jsna7927f57bec2',
                        'X-RapidAPI-Host': 'computer-components-api.p.rapidapi.com'
                    }
                });


                let result = []
                for (const processor of processors) {
                    let data = {}
                    data.title = processor.title
                    data.img = processor.img
                    data.type = 'Processor'
                    data.createdAt = new Date()
                    data.updatedAt = new Date()
                    data.price = await currencyAPI(processor.price)
                    result.push(data)
                }
                // console.log(result);
                await Product.bulkCreate(result)
                // console.log(data);
                const data = await Product.findAll({ where: { type: 'Processor' } })

                res.status(200).json(data)
                // console.log(data);
            }
        } catch (error) {
            // console.log(error);
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getGPU(req, res) {
        try {
            const data = await Product.findAll({ where: { type: 'GPU' } })
            // console.log(dataProc.length);
            if (data.length > 0) {
                // console.log('sini brayyy kont');

                res.status(200).json(data)
            } else {
                // console.log('sini bro');
                const currencyAPI = async (price) => {
                    const { data: val } = await axios({
                        method: 'GET',
                        url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
                        params: { have: 'USD', want: 'IDR', amount: price },
                        headers: {
                            'X-RapidAPI-Key': '694730de7bmshfb067e0019ac1cdp1f7aa4jsna7927f57bec2',
                            'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
                        }
                    })
                    return val.new_amount
                }

                const { data: GPU } = await axios({
                    method: 'GET',
                    url: 'https://computer-components-api.p.rapidapi.com/gpu',
                    params: { limit: '20', offset: '0' },
                    headers: {
                        'X-RapidAPI-Key': '694730de7bmshfb067e0019ac1cdp1f7aa4jsna7927f57bec2',
                        'X-RapidAPI-Host': 'computer-components-api.p.rapidapi.com'
                    }
                });


                let result = []
                for (const gpu of GPU) {
                    let data = {}
                    data.title = gpu.title
                    data.img = gpu.img
                    data.type = 'GPU'
                    data.createdAt = new Date()
                    data.updatedAt = new Date()
                    data.price = await currencyAPI(gpu.price)
                    result.push(data)
                }
                // console.log(result);
                await Product.bulkCreate(result)
                // console.log(data);
                const data = await Product.findAll({ where: { type: 'GPU' } })

                res.status(200).json(data)
                // console.log(data);
            }
        } catch (error) {
            // console.log(error);
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getRAM(req, res) {
        try {
            const data = await Product.findAll({ where: { type: 'RAM' } })
            // console.log(dataProc.length);
            if (data.length > 0) {
                // console.log('sini brayyy kont');

                res.status(200).json(data)
            } else {
                // console.log('sini bro');
                const currencyAPI = async (price) => {
                    const { data: val } = await axios({
                        method: 'GET',
                        url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
                        params: { have: 'USD', want: 'IDR', amount: price },
                        headers: {
                            'X-RapidAPI-Key': '694730de7bmshfb067e0019ac1cdp1f7aa4jsna7927f57bec2',
                            'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
                        }
                    })
                    return val.new_amount
                }

                const { data: RAM } = await axios({
                    method: 'GET',
                    url: 'https://computer-components-api.p.rapidapi.com/ram',
                    params: { limit: '20', offset: '0' },
                    headers: {
                        'X-RapidAPI-Key': '694730de7bmshfb067e0019ac1cdp1f7aa4jsna7927f57bec2',
                        'X-RapidAPI-Host': 'computer-components-api.p.rapidapi.com'
                    }
                });


                let result = []
                for (const ram of RAM) {
                    let data = {}
                    data.title = ram.title
                    data.img = ram.img
                    data.type = 'RAM'
                    data.createdAt = new Date()
                    data.updatedAt = new Date()
                    data.price = await currencyAPI(ram.price)
                    result.push(data)
                }
                // console.log(result);
                await Product.bulkCreate(result)
                // console.log(data);
                const data = await Product.findAll({ where: { type: 'RAM' } })

                res.status(200).json(data)
                // console.log(data);
            }
        } catch (error) {
            // console.log(error);
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getMobo(req, res) {
        try {
            const data = await Product.findAll({ where: { type: 'Motherboard' } })
            // console.log(dataProc.length);
            if (data.length > 0) {
                // console.log('sini brayyy kont');

                res.status(200).json(data)
            } else {
                // console.log('sini bro');
                const currencyAPI = async (price) => {
                    const { data: val } = await axios({
                        method: 'GET',
                        url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
                        params: { have: 'USD', want: 'IDR', amount: price },
                        headers: {
                            'X-RapidAPI-Key': '694730de7bmshfb067e0019ac1cdp1f7aa4jsna7927f57bec2',
                            'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
                        }
                    })
                    return val.new_amount
                }

                const { data: Motherboards } = await axios({
                    method: 'GET',
                    url: 'https://computer-components-api.p.rapidapi.com/motherboard',
                    params: { limit: '20', offset: '0' },
                    headers: {
                        'X-RapidAPI-Key': '694730de7bmshfb067e0019ac1cdp1f7aa4jsna7927f57bec2',
                        'X-RapidAPI-Host': 'computer-components-api.p.rapidapi.com'
                    }
                });


                let result = []
                for (const motherboard of Motherboards) {
                    let data = {}
                    data.title = motherboard.title
                    data.img = motherboard.img
                    data.type = 'Motherboard'
                    data.createdAt = new Date()
                    data.updatedAt = new Date()
                    data.price = await currencyAPI(motherboard.price)
                    result.push(data)
                }
                // console.log(result);
                await Product.bulkCreate(result)
                // console.log(data);
                const data = await Product.findAll({ where: { type: 'Motherboard' } })

                res.status(200).json(data)
                // console.log(data);
            }
        } catch (error) {
            // console.log(error);
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getPSU(req, res) {
        try {
            const data = await Product.findAll({ where: { type: 'PSU' } })
            // console.log(dataProc.length);
            if (data.length > 0) {
                // console.log('sini brayyy kont');

                res.status(200).json(data)
            } else {
                // console.log('sini bro');
                const currencyAPI = async (price) => {
                    const { data: val } = await axios({
                        method: 'GET',
                        url: 'https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency',
                        params: { have: 'USD', want: 'IDR', amount: price },
                        headers: {
                            'X-RapidAPI-Key': '694730de7bmshfb067e0019ac1cdp1f7aa4jsna7927f57bec2',
                            'X-RapidAPI-Host': 'currency-converter-by-api-ninjas.p.rapidapi.com'
                        }
                    })
                    return val.new_amount
                }

                const { data: PSU } = await axios({
                    method: 'GET',
                    url: 'https://computer-components-api.p.rapidapi.com/power_supply',
                    params: { limit: '20', offset: '0' },
                    headers: {
                        'X-RapidAPI-Key': '694730de7bmshfb067e0019ac1cdp1f7aa4jsna7927f57bec2',
                        'X-RapidAPI-Host': 'computer-components-api.p.rapidapi.com'
                    }
                });


                let result = []
                for (const psu of PSU) {
                    let data = {}
                    data.title = psu.title
                    data.img = psu.img
                    data.type = 'PSU'
                    data.createdAt = new Date()
                    data.updatedAt = new Date()
                    data.price = await currencyAPI(psu.price)
                    result.push(data)
                }
                // console.log(result);
                await Product.bulkCreate(result)
                // console.log(data);
                const data = await Product.findAll({ where: { type: 'PSU' } })

                res.status(200).json(data)
                // console.log(data);
            }
        } catch (error) {
            // console.log(error);
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async addToCart(req, res) {
        try {
            const UserId = req.user.id
            const ProductId = req.params.productId

            const findProduct = await Product.findOne({ where: { id: ProductId } })
            if (!findProduct) {
                throw { status: 404, message: 'Product Not Found' }
            }

            const findCart = await Cart.findOne({ where: { ProductId: findProduct.id, UserId } })
            if (!findCart) {
                const createdCart = await Cart.create({ UserId, ProductId, quantity: 1, totalPrice: findProduct.price })

                res.status(201).json({ message: 'Success Add Product To Cart' })
            } else {
                const updateCart = await Cart.update({
                    quantity: findCart.quantity + 1,

                    totalPrice: findCart.totalPrice + findProduct.price
                },
                    { where: { UserId: req.user.id } }
                )
                res.status(201).json({ message: 'Success Update Product To Cart' })
            }
        } catch (error) {
            if (error.status) {
                res.status(res.status).json({ message: error.message })
            } else {
                res.status(500).json({ message: 'Internal server error' })
            }
            console.log(error);
        }
    }

    static async getCart(req, res) {
        try {
            const UserId = req.user.id
            console.log(UserId);
            const dataCart = await Cart.findAll({ include: Product, where: { UserId } })

            res.status(200).json(dataCart)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async generateMidtransToken(req, res) {
        const UserId = req.user.id
        const findCart = await Cart.findAll({where:{UserId}})

        let totalPayment = 0

        findCart.forEach(el => {
            totalPayment += el.totalPrice
        });

        try {
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "InvoiceId_" + Math.floor(100000 + Math.random() * 900000),
                    "gross_amount": totalPayment
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": req.user.email,
                }
            };

            const tokenMidtrans = await snap.createTransaction(parameter)
            
            res.status(201).json(tokenMidtrans)
        } catch (error) {
            res.status(500).json({})
        }
    }
}

module.exports = ProductController