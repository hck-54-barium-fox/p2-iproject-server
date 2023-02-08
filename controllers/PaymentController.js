const { User } = require("../models");

class PaymentController {
  static async payment(req, res, next) {
    try {
      await User.update(
        {
          isPurchased: false,
        },
        {
          where: {
            id: req.user.id,
          },
        }
      );
      res.status(200).json({
        message: `User with id ${req.user.id} pruchase status is true`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = PaymentController;
