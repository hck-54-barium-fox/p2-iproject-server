const { User, Event } = require('../models/index')
const axios = require("axios");

class ControllerEvent {

    static async addEvent(req, res, next) {
        try {
            console.log(req.body)
            let id = 2
            const { title, content, eventDate, imageUrl } = req.body
            const createdEvent = await Event.create({ title, content, eventDate, UserId: id, imageUrl })
            res.status(201).json({ message: `your event has been created` })
        } catch (error) {
            next(error)
        }
    }
    static async getAllEvent(req, res, next) {
        try {
            const dataEvent = await Event.findAll()
            res.status(200).json(dataEvent)
        } catch (error) {
            next(error)
        }
    }
    static async getEventDetails(req, res, next) {
        try {
            const { eventId } = req.params
            const dataDetails = await Event.findByPk(eventId)
            res.status(200).json(dataDetails)
        } catch (error) {
            next(error)
        }
    }
    // static async getQrCode(req, res, next) {
    //     try {
    
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}
module.exports = ControllerEvent