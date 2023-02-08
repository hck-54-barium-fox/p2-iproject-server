const axios = require("axios");
const { QueryInterface } = require("sequelize");
const { Weapon } = require('../models')

class weaponController {

    static async readWeapon(req, res, next) {
        try {
            const data = await Weapon.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })
            res.status(200).json(data)
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async weaponById (req, res, next){
        const id = req.params.id
        try {
            const weapon =  await Weapon.findOne({
                where: {
                    id
                }
            })
            res.status(200).json(weapon)
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Internal server error"})
        }
    }


}

module.exports = weaponController