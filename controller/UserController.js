const { User, Transaction, Player } = require('../models/index')
const { compare } = require('../helpers/bcrypt')
const { sign } = require('../helpers/jwt');
const midtransClient = require('midtrans-client');

class UserController {
    static async Register(request, response) {
        try {
            let { username, email, password } = request.body
            if (!username) {
                response.status(400).json({ message: 'Username is required' })
                return
            }
            if (!email) {
                response.status(400).json({ message: 'Email is required' })
                return
            }
            if (!password) {
                response.status(400).json({ message: 'Password is required' })
                return
            }
            console.log(username, password, email);
            let dataRegister = await User.create({ username, email, password })
            response.status(201).json(dataRegister)
        } catch (error) {
            console.log(error, 'ini di register');
            if (error.name == 'SequelizeValidationError') {
                response.status(400).json({ message: error.errors[0].message })
            } else if (error.name == 'SequelizeUniqueConstraintError') {
                response.status(400).json({ message: error.errors[0].message })
            } else {
                response.status(500).json({ message: 'Internal Server Error' })
            }
        }
    }

    static async Login(request, response, next) {
        try {
            let { email, password } = request.body
            console.log(email, password);
            if (!email || !password) {
                // response.status(400).json('email or apssword is required')
                response.status(400).json({ message: 'Email or Password is required' })
                return
            }
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                response.status(400).json({ message: 'Email or Password not found' })
                return
            }
            let compares = compare(password, user.password)

            if (!compares) {
                response.status(400).json({ message: 'Email or Password not found' })
                return
            }
            let payload = {
                id: user.id,
                email: user.email,
                username: user.username,
            }
            console.log(payload.username, '<<<<<<<<');
            let access_token = sign(payload)
            response.status(200).json({ access_token })
        } catch (error) {
            console.log(error, 'ini di login');
            response.status(500).json({ message: 'internal server error' })
        }
    }

    static async getProfile(request, response) {
        try {
            let userLogin = await User.findByPk(request.user.id)
            response.status(200).json({ id: userLogin.id, status: userLogin.status })
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: 'internal server error' })
        }
    }

    static async subscribe(request, response) {
        try {
            let findUser = await User.findByPk(request.user.id)
            let changeStatus = await User.update({ status: 'premium' }, {
                where: {
                    id: request.user.id
                }
            })
            let newTransaction = await Transaction.create({
                log: `${findUser.username} has been subscribe`,
                paymentDate: new Date(),
                paymentBy: findUser.username
            })
            response.status(200).json({ message: `User with id ${findUser.Username} is now a subscriber` })
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: `Internal Server Error` })
        }
    }

    static async midtransToken(request, response) {
        try {
            const findUser = await User.findByPk(request.user.id)
            if (findUser.status == 'premium') {
                response.status(400).json({ message: 'Already Subscribe' })
                return
            }
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY
            });
            let parameter = {
                transaction_details: {
                    order_id: "TRANSACTION" + (Date.now() + Math.random()),
                    gross_amount: 49999
                },
                credit_card: {
                    secure: true
                },
                customer_details: {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    email: findUser.email
                    // "phone": "08111222333"
                }
            };
            const midtransToken= await snap.createTransaction(parameter)
            console.log(midtransToken ,'<<<<');
            response.status(201).json(midtransToken)
                
        } catch (error) {
            console.log(error);
            if(error.name == 'MidtransError') {
                response.status(400).json(error.ApiResponse.error_messages[0])
            }
        }
    }
}

module.exports = UserController