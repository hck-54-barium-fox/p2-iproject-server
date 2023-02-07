const { User, Letter } = require("../models");
const letter = require("../models/letter");
class PaymentController {
  static async checkPayment(req, res, next) {
    try {
      const userId = req.params.id;
      const { status, letterId } = req.params;

      if (status === "failed") {
        await Letter.destroy({
          where: {
            id: letterId,
          },
        });
        res.redirect("http://google.com");
      } else {
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
        res.redirect("http://google.com");
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async payment(req, res, next) {
    try {
      const { letterId } = req.params;
      const data = await stripe.checkout.sessions.create({
        success_url: `http://localhost:3000/checkpayment/${letterId}/success?user_id=${req.user.id}`,
        cancel_url: `http://localhost:3000/checkpayment/${letterId}/failed?user_id=${req.user.id}`,
        line_items: [{ price: "price_1MYlktKmmnAbjBro5otNEKfV", quantity: 1 }],
        mode: "payment",
      });
      res.redirect(data.url);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = PaymentController;
