const { myWeapon, Weapon, User } = require('../models')
const midtransClient = require('midtrans-client');

class myWeaponController {
    static async addMyWeapon(req, res, next) {
        try {
            const weaponId = req.params.weaponId
            if (!weaponId) {
                throw { code: 404, message: "Weapon not found" }
            }
            const data = await myWeapon.create({
                UserId: req.user.id,
                WeaponId: weaponId,
                status: "Unplayed"
            })
            res.status(201).json(data)
        } catch (err) {
            console.log(err);
            if (err.code) {
                res.status(err.code).json({ message: err.message })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }

    static async readMyWeapon(req, res, next) {
        try {
            const myList = await myWeapon.findAll({
                where: {
                    UserId: req.user.id,
                },
                include: {
                    model: Weapon,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                order: [
                    ['id', 'ASC']
                ]
            })
            res.status(200).json(myList)
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async statusWeapon(req, res, next) {
        const id = req.params.id
        try {
            const data = await myWeapon.update({
                status: "Played"
            }, {
                where: {
                    id
                }
            }
            )
            if (!data) {
                throw { code: 404, message: "Data not found" }
            }
            res.status(200).json({ message: "Weapon has been played" })
        } catch (err) {
            if (err.code) {
                res.status(err.code).json(err.message)
            } else {
                res.status(500).status({ message: "Internal server error" })
            }
        }

    }

    static async deleteWeapon(req, res, next) {
        const id = req.params.id
        try {
            const weapon = await myWeapon.findOne({
                where: {
                    id
                }
            })
            if (!weapon) {
                throw { code: 404, message: "Weapon Not Found" }
            }
            const deleted = await myWeapon.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({ message: "Remove Weapon" })
        } catch (err) {
            if (err.code) {
                res.status(err.code).json(err.message)
            } else {
                res.status(500).status({ message: "Internal server error" })
            }
        }
    }

    static async midtransPayment(req, res, next) {
        try {
            const myid = req.params.id
            const user = await User.findByPk(req.user.id)
            const weapon = await myWeapon.findOne({
                where: {
                    id: myid
                },
                include: {
                    model: Weapon
                }
            })
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION" + Math.floor(1000000 + Math.random() * 9000000),
                    "gross_amount": weapon.Weapon.price,
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": user.email,
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            // console.log(midtransToken, "<<<<<< token nya");
            res.status(200).json(midtransToken)
                
        } catch (err) {
            console.log(err);

        }
    }



}

module.exports = myWeaponController