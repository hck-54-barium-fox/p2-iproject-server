const { Card, Player, Deck } = require("../models/index");


class ControllerDeck {
    static async getMyDeck(req, res, next) {
        try {
            let dataDeck = await Deck.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            res.status(200).json(dataDeck)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async postMyDeck(req, res, next) {
        try {
            let dataDeck = await Deck.create({
                UserId: req.user.id,
                CardId: req.params.id
            })
            res.status(201).json(dataDeck)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerDeck