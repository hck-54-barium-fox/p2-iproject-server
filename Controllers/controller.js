const { compare } = require('../middleware/bcrypt')
const { createToken } = require('../middleware/jwt')
const { User, Trainer, MyExercise } = require('../models/index')
const midtransClient = require('midtrans-client');

const axios = require("axios");

class Controller {
    static async register(req, res) {
        try {
            const { name, email, password, height, weight } = req.body
            User.create({ name, email, password, height, weight })
            res.status(200).json({
                message: "Anda berhasil daftar baginda"
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            let user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                throw { msg: "Invalid email/password" }
            } else {
                let compareResult = compare(password, user.password)
                if (!compareResult) {
                    throw { msg: "Invalid email/password" }
                } else {
                    const { id, email, username } = user
                    let token = createToken({
                        id,
                        email
                    })
                    res.status(200).json({ token, username })
                }
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getBmi(req, res) {
        try {
            const id = req.user.id
            const user = await User.findByPk(id)
            const { data } = await axios({
                method: 'GET',
                url: 'https://mega-fitness-calculator1.p.rapidapi.com/bmi',
                params: { weight: user.weight, height: user.height },
                headers: {
                    'X-RapidAPI-Key': '6f99339649mshabefed9036baf74p11ebddjsnb7b1e29afef6',
                    'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
                }
            })
            res.status(200).json({
                name: user.name,
                info: data.info
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getBodyPart(req, res) {
        try {
            const { data } = await axios({
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
                headers: {
                    'X-RapidAPI-Key': '6f99339649mshabefed9036baf74p11ebddjsnb7b1e29afef6',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getExerciseByBodyPart(req, res) {
        try {
            const { bodyPart } = req.query
            const words = bodyPart.split(' ').join('%20')
            const { data } = await axios({
                method: 'GET',
                url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${words}`,
                headers: {
                    'X-RapidAPI-Key': '6f99339649mshabefed9036baf74p11ebddjsnb7b1e29afef6',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getEquipment(req, res) {
        try {
            const { data } = await axios({
                method: 'GET',
                url: 'https://exercisedb.p.rapidapi.com/exercises/equipmentList',
                headers: {
                    'X-RapidAPI-Key': '6f99339649mshabefed9036baf74p11ebddjsnb7b1e29afef6',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getExerciseByEquipment(req, res) {
        try {
            const { equipment } = req.query
            const words = equipment.split(' ').join('%20')
            const { data } = await axios({
                method: 'GET',
                url: `https://exercisedb.p.rapidapi.com/exercises/equipment/${words}`,
                headers: {
                    'X-RapidAPI-Key': '6f99339649mshabefed9036baf74p11ebddjsnb7b1e29afef6',
                    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getTrainer(req, res) {
        try {
            const trainers = await Trainer.findAll()
            res.status(200).json(trainers)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async midtrans(req, res) {
        try {
            const findUser = User.findByPk(req.user.id)
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: 'SB-Mid-server-1H_EvcxAPZYItUm7-sgReZVB'
            });

            let parameter = {
                "transaction_details": {
                    "order_id": Math.random().toString().slice(2, 11),
                    "gross_amount": 10000
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    // "first_name": "budi",
                    // "last_name": "pratama",
                    "email": findUser.email,
                    // "phone": "08111222333"
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            res.status(200).json(midtransToken)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async addMyExercise(req, res) {
        try {
            const id = req.user.id
            const { UserId, bodyPart, equipment, gifUrl, name,target} = req.body
            const data = await MyExercise.create({
                UserId: id,
                bodyPart,
                equipment,
                gifUrl,
                name,
                target
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async getMyExercise(req, res) {
        try {
            const id = req.user.id
            const data = await MyExercise.findAll({
                where: {
                    UserId : id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


module.exports = Controller