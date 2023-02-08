const {Smartphone} = require('../models/index')

class Controller{
    static async getAllSmartphone(req, res, next){
        try {
            let data = await Smartphone.findAll()
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async detailPhoneById(req, res, next) {
        try {
          let { id } = req.params;
          let dataPhone = await Smartphone.findByPk(id);
          if (!dataPhone) {
            throw { name: "NotFound" };
          } 
          res.status(200).json( dataPhone );
        } catch (error) {
          next(error);
        }
    }
}


module.exports = Controller