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
            let totalDeck = await Deck.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            if (totalDeck.length >= 8) throw ({status: 401, msg: 'Your deck is full!'})
            let dataDeck = await Deck.create({
                UserId: req.user.id,
                CardId: req.params.id
            })
            res.status(201).json(dataDeck)
        } catch (error) {
            next(error)
        }
    }
    static async deleteMyCardInDeck(req, res, next) {
        try {
            await Deck.destroy({
                where: {
                    CardId: req.params.id
                }
            })
            res.status(200).json({message: 'Your deck successfully deleted'})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerDeck