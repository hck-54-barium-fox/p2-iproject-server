const axios = require('axios');
const { User } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const { comparePass } = require('../helpers/bcrypt');
const { sign } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');
const { sendEmail, konfirmasiTransfer } = require('../helpers/nodemailer');



class Controller {

    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            console.log(req.body);
            const data = await User.create({
                username,
                email,
                password,
                status: "jama'ah"
            })
            const output = {
                id: data.id,
                username: data.username,
                status: data.status
            }
            sendEmail(email)

            res.status(201).json(output)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            console.log(req.body, '<<<<<<<<<<<<<<<<<<<');
            const find = await User.findOne({
                where: {
                    email
                }
            })
            // console.log(find, '<<<<<<< login');
            if (!find) {
                throw { name: "invalid username/password" }
            }
            const verify = comparePass(password, find.password)
            if (!verify) {
                throw { name: "invalid username/password" }
            }
            const access_token = sign({
                id: find.id,
                username: find.username
            })

            res.status(200).json({ access_token })
        } catch (err) {
            next(err)
        }
    }

    // static async googleLogin(req, res, next) {
    //     try {
    //         const CLIENT_ID = process.env.CLIENT_ID
    //         const client = new OAuth2Client(CLIENT_ID);
    //         const ticket = await client.verifyIdToken({
    //             idToken: req.body.google_token,
    //             audience: CLIENT_ID,
    //         });
    //         const payload = ticket.getPayload();
    //         const userid = payload['sub'];
    //         const [user, created] = await User.findOrCreate({
    //             where: { email: payload.email },
    //             defaults: {
    //                 username: payload.given_name,
    //                 email: payload.email,
    //                 password: "12345",
    //                 status: "jama'ah",
    //             },
    //             hooks: false
    //         });
    //         let access_token = sign({
    //             id: user.id,
    //             username: user.username

    //         })
    //         console.log(access_token, '<< 115');
    //         res.status(200).json({ access_token, username: user.username })
    //         // console.log(token, '<<<<< token');
    //         // lempar access token dan username ke client


    //     } catch (err) {
    //         // console.log(error, '<<<<< google login');
    //         next(err)
    //     }
    // }



}


module.exports = Controller