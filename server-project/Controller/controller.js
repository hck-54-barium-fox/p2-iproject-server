const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const games = require('../games.json');
const axios =require('axios');

class Controller {

    static async register(req, res) {
        try {
            let { email, password, username } = req.body
            let dataRegister = await User.create({
                email,
                password,
                username
            })
            let dataResult = {
                id: dataRegister.id,
                email: dataRegister.email,
                username: dataRegister, username
            }
            res.status(200).json(dataResult)
        } catch (err) {
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ message: err.errors[0].message })
            } else if (err.name === "SequelizeValidationError") {
                res.status(400).json({ message: err.errors[0].message })
            } else {
                res.status(500).json({ message: "Internal server error", err })
            }
        }
    }

    static async login(req, res) {
        try {
            let { email, password } = req.body
            if (!email) {
                throw ({ name: "Email is required" })
            }

            if (!password) {
                throw ({ name: "Password is required" })
            }
            let dataLogin = await User.findOne({
                where: {
                    email
                }
            })

            if (!dataLogin) {
                throw ({ name: "Invalid email/password" })
            }

            if (!comparePassword(password, dataLogin.password)) {
                throw ({ name: "Invalid email/password" })
            }

            let access_token = signToken({ id: dataLogin.id, email: dataLogin.email })

            res.status(200).json({ access_token })
        } catch (err) {
            if (err.name === "Invalid email/password") {
                res.status(401).json({ message: err.name })
            } else if (err.name) {
                res.status(400).json({ message: err.name })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }

    static async fetchGames(req, res) {
        try {

            res.status(200).json(games)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async fetchGamesById(req, res) {
        try {
            let { id } = req.params
            let result = []
            games.find(el => {
                if (el.steam_appid === +(id)) {
                    return result = el
                }
            })

            if (result.length === 0) {
                throw ({ name: "Data Not Found" })
            }

            res.status(200).json(result)

        } catch (err) {
            if (err.name === "Data Not Found") {
                res.status(400).json({ message: "Data Not Found" })
            } else {
                res.status(500).json({ message: "Internal server error" })

            }
        }
    }


    static fetchNewsTechnologies(req, res) {
        const options = {
            method: 'GET',
            url: ' https://newsapi.org/v2/top-headlines',
            params: {
                'country': 'us',
                'category': 'technology',
                'apiKey':'3224442aca354406b000d716385f5412'
            }
        };
        axios.request(options).then(function (response) {
            // console.log(response.data);
            let dataNews = response.data
            let resultNews= dataNews.articles.map(el=>{
                return {
                    "source":el.source.name,
                    "author":el.author,
                    "title" :el.title,
                    "urlToImage":el.urlToImage,
                    "publishedAt":el.publishedAt.substring(0,10),
                    "content":el.content
                }
            })
            res.status(200).json(resultNews)

        }).catch(function (error) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" })
        });
    }
}
module.exports = Controller