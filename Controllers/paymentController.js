const { User, Letter } = require("../models");
const letter = require("../models/letter");
const stripe = require("stripe")(process.env.STRIPE_KEY);

class PaymentController {
  static async okayPayment(req, res, next) {
    try {
      const { letterId } = req.params;
      const letter = await Letter.findByPk(letterId);
      if (!letter) {
        throw { name: "notFound" };
      }
      await Letter.update(
        {
          status: "paid",
        },
        {
          where: {
            id: letterId,
          },
        }
      );
      res.status(200).json({
        message: "Letter is now paid"
      })
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async payment(req, res, next) {
    try {
      const { letterId } = req.params;
      const data = await stripe.checkout.sessions.create({
        cancel_url: `http://localhost:5173/?paymentstatus=failed`,
        success_url: `http://localhost:5173/submitpoem/${letterId}`,
        line_items: [{ price: "price_1MYlktKmmnAbjBro5otNEKfV", quantity: 1 }],
        mode: "payment",
      });
      res.status(200).json(data.url);
    } catch (err) {
      next(err);
      console.log(err);
    }
  }
}

module.exports = PaymentController;
