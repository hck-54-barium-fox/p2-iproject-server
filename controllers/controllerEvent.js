const { User, Event } = require('../models/index')
const axios = require("axios");

class ControllerEvent {

    static async addEvent(req, res, next) {
        try {
            console.log(req.body)
            const { title, content, eventDate, imageUrl } = req.body
            const createdEvent = await Event.create({ title, content, eventDate, UserId: req.user.id, imageUrl })
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
    static async deleteEvent(req, res, next) {
        try {
            const { eventId } = req.params
            console.log(eventId)
            console.log(`masukkk`)
            const deletedData = await Event.destroy({ where: { id: eventId } })
            if (deletedData) {
                res.status(200).json({ message: "your event has been deleted" })
            } else {
                throw { message: "data not found" }
            }
        } catch (error) {
            console.log(error)
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const { eventId } = req.params
            const updateData = await Event.update({ status: 'finished' }, { where: { id: eventId } })
            if (updateData) {
                res.status(200).json({ message: "your event has been deleted" })
            } else {
                throw { message: "data not found" }
            }
        } catch (error) {

        }
    }
}
module.exports = ControllerEvent