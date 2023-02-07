const { compare } = require('../middleware/bcrypt')
const { createToken } = require('../middleware/jwt')
const { User, Trainer } = require('../models/index')
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
            console.log(user.weight, user.height)
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
            const {data} = await axios({
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
}


module.exports = Controller