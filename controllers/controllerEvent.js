const { User, Event } = require('../models/index')

class ControllerEvent {

    static async addEvent(req, res, next) {
        try {
            const { title, content, eventDate, imageUrl } = req.body
            const createdEvent = await Event.create({ title, content, eventDate, UserId: req.user.id, imageUrl })
            res.status(201).json({ message: `your event has been created` })
        } catch (error) {
            next(error)
        }
    }
    static async getAllEvent(req, res, next) {
        try {
            const dataEvent = await Event.findAll({ order: ['createdAt', 'DESC'] })
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
}
module.exports = ControllerEvent