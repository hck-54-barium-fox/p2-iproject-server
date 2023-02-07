const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models/index");
const games = require('../games.json');
const axios = require('axios');
const fs = require("fs");

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
                'apiKey': '3224442aca354406b000d716385f5412'
            }
        };
        axios.request(options).then(function (response) {
            // console.log(response.data);
            let dataNews = response.data
            let resultNews = dataNews.articles.map(el => {
                return {
                    "source": el.source.name,
                    "author": el.author,
                    "title": el.title,
                    "urlToImage": el.urlToImage,
                    "publishedAt": el.publishedAt.substring(0, 10),
                    "content": el.content
                }
            })
            res.status(200).json(resultNews)

        }).catch(function (error) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" })
        });
    }




    static async fetchDataGamesSteamAppId(req, res) {
        try {

            // const id = 985810
            const dataId = [570, 985810, 10, 500,1748523,1748524,1748525,1748526,1748527,1748528,578080
            ]

            const dataTotalUrl = []
            for (let i = 0; i < dataId.length; i++) {
                let options = {
                    method: 'GET',
                    url: 'https://store.steampowered.com/api/appdetails',
                    params: {
                        appids: dataId[i]
                    }
                }
                dataTotalUrl.push(options)
            }
            // console.log(dataTotalUrl);

            const secondGetSteam = async (payload) => {
                const { data } = await axios(payload)
                return data
            }

            let array = []

            for (const steam of dataTotalUrl) {
                let dataSteam = await secondGetSteam(steam)
                // console.log(dataSteam)

                let resultDataSteam = '';
                for (let key in dataSteam) {
                    resultDataSteam = dataSteam[`${key}`].data
                }

                let finalDataSteam = {}
                for (let gameSteam in resultDataSteam) {
                    if (resultDataSteam['is_free'] === false) {

                        finalDataSteam = {
                            name: resultDataSteam['name'],
                            steam_appid: resultDataSteam['steam_appid'],
                            price: resultDataSteam['price_overview'].final_formatted,
                            about_the_game: resultDataSteam['about_the_game'],
                            detailed_description: resultDataSteam['detailed_description'],
                            image: resultDataSteam['header_image'],
                            platforms: resultDataSteam['platforms']
                        }

                    } else {

                        finalDataSteam = {
                            name: resultDataSteam['name'],
                            steam_appid: resultDataSteam['steam_appid'],
                            price: "Rp 0",
                            detailed_description: resultDataSteam['detailed_description'],
                            supported_languages: resultDataSteam['supported_languages'],
                            image: resultDataSteam['header_image'],
                            platforms: resultDataSteam['platforms']
                        }
                    }
                }
                array.push(finalDataSteam)
            }
            // console.log(array)
         

            const jsonData = JSON.stringify(array);

            fs.writeFile("games.json", jsonData, "utf8", (error) => {
                if (error) {
                    console.error(error);
                } else {
                    console.log("Data saved to data.json file");
                }
            });

            res.status(200).json(array)
        } catch (err) {
            res.status(500).json({ message: "Internal server eror" })
        }

    }
}
module.exports = Controller