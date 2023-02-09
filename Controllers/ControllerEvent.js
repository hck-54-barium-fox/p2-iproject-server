const axios = require('axios');
const { Event, UsersEvent, User, Patron } = require('../models');
const midtransClient = require('midtrans-client');
const { konfirmasiTransfer } = require('../helpers/nodemailer');

class Controller {


    static async jadwalSholat(req, res, next) {
        try {
            let kota = 1301
            const { place } = req.params
            console.log(req.params, '<<<<jdsolatt');
            const date = new Date().getDate()
            let month = new Date().getMonth()
            month++
            const year = new Date().getFullYear()
            // console.log(date, month, year, new Date(), '<<<<<<<<<<<<');
            // console.log(place, '>>>>>>>>>>>>>');
            const { data } = await axios({
                method: 'get',
                url: `https://api.myquran.com/v1/sholat/jadwal/${kota}/${year}/${month}/${date}`,

            })
            const output = data.data.jadwal
            output.kota = place
            // console.log(data.data.jadwal, 'ini bos <<<<<');
            // console.log(output, 'ini bos <<<<<');
            res.status(200).json(output)
        } catch (err) {
            // console.log(err, 'jadwal solat');
            next(err)
        }
    }

    static async jadwalKegiatan(req, res, next) {
        try {
            const data = await Event.findAll()
            // console.log(data, '<<<<<<<<<<<<<<<<');
            res.status(200).json(data)
        } catch (err) {

            next(err)
        }
    }
    static async favorite(req, res, next) {
        try {
            const idPost = req.params.id
            const UserId = req.user.id
            // console.log(idPost, UserId, '<<<<<<<<<<<<<<<<<<<<<<<<');
            // console.log(idPost, '<<< idpost', UserId, '<<<< UserId', new Date());
            const event = await Event.findByPk(idPost)
            if (!event) {
                throw { name: ' Data Not Found' }
            }
            const like = await UsersEvent.create({
                EventId: idPost,
                UserId: UserId
            })
            const { createdAt, updatedAt, ...rest } = like.dataValues
            // console.log(rest, '<<<<< rest');
            res.status(201).json({ "message": "success like post" })
        } catch (err) {
            // console.log(err, '<<< err like post');
            next(err)
        }
    }

    static async allFavorite(req, res, next) {
        try {
            const id = req.user.id
            // console.log(id, 'req.user');
            const allLike = await Event.findAll({
                include: {
                    model: UsersEvent,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    where: {
                        UserId: id
                    },
                    order: [['createdAt', 'DESC']],
                    include: {
                        model: User,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt'],
                        },
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                },
                attributes: {
                    exclude: ['password', 'createdAt', 'updatedAt']
                }
            })
            // console.log(allLike, '>>>>>>>>>>>>>>>>>>');
            res.status(200).json(allLike)
        } catch (err) {
            // console.log(err, '<<<<< allike ctl');
            next(err)

        }
    }

    static async midtoken_generate(req, res, next) {

        try {
            // Create Snap API instance

            let { totalPembayaran } = req.body
            let { id } = req.user

            const findUser = await User.findByPk(id)
            if (findUser) {
                await User.update({
                    status: 'Donatur'
                },
                    {
                        where: {
                            id
                        }
                    })
            }

            console.log(req.body, id, '<<<< generate token bos');
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_Server_Key,
            });


            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(1000 + Math.random() * 90000),
                    "gross_amount": totalPembayaran
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "first_name": findUser.username,
                    "last_name": "",
                    "email": findUser.email,
                    "phone": ""
                }
            };

            const mid_token = await snap.createTransaction(parameter)
            console.log(mid_token, '<<<<<<<<<<<<<<<<<');
            res.status(201).json({ mid_token: mid_token.token })

        } catch (err) {
            console.log(err, '<<<<<<');
        }
    }

    static async donatur(req, res, next) {
        try {
            const { id } = req.user
            const { jumlah, category } = req.body
            console.log(req.body, '<<<<<< reqbody bos');
            const find = await User.findByPk(id)

            const donatur = await Patron.create({
                name: find.username,
                jumlah,
                category,
                donaturId: id
            })

            konfirmasiTransfer(find.email)
            res.status(201).json(donatur)
        } catch (err) {

            console.log(err, 'dari donatur bos');
        }
    }

}


module.exports = Controller