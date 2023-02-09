const {User, Transaction, Player} = require('../models/index')

class PlayerController {
    static async GetAllPlayers(request, response) {
        try {
            let data = await Player.findAll()
            response.status(200).json(data)
        } catch (error) {
            console.log(error, 'ini di getall players');
            response.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async GetPlayer(request, response) {
        try {
            let id = request.params.id
            let findPlayer = await Player.findByPk(id)
            if (!findPlayer) {
                response.status(404).json({message: 'Not Found'})
                return
            }
            response.status(200).json(findPlayer)
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Internal Server Error'})
        }
    }

    static async GetPlayerByThird(request, response) {
        try {
            let id = request.params.id
            let findPlayer = await Player.findOne({
                where:{
                    thirdapiId: id
                }
            })
            if (!findPlayer) {
                response.status(404).json({message: 'Not Found'})
                return
            }
            response.status(200).json(findPlayer)
        } catch (error) {
            console.log(error);
            response.status(500).json({message: 'Internal Server Error'})
        }
    }
}

module.exports = PlayerController