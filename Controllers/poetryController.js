const { User, Letter } = require("../models");
const nodemailer = require("nodemailer");
stripe = require("stripe")(process.env.STRIPE_KEY);

const axios = require("axios");

class PoetryController {
  static async getLetterPerSearch(req, res, next) {
    try {
      const { search } = req.params;
      const { data } = await axios({
        method: "GET",
        url: `https://poetrydb.org/title/${search}/lines.json`,
      });
      if (data.status === 404) {
        throw { name: "notFound" };
      }
      const choose = Math.ceil(Math.random() * data.length - 1);
      const result = data[choose].lines.join(" ");

      await Letter.create({
        content : result,
        UserId: req.user.id,
        status : "unpaid"
      })

      res.status(200).json(result);
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
    } catch (err) {
      console.log(err);
      next(err);
    }
  }



  static async getMyLetter(req, res, next){
    try {
        const getMyLetter = await Letter.findAll({
            where: {
                UserId : req.user.id,
                status: "paid"
            }
        })
        res.status(200).json(getMyLetter)
    } catch (err) {
        next(err)
    }
  }

}

module.exports = PoetryController;
