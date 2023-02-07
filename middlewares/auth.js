const { decode } = require("../helpers/helper");
const { Customer } = require("../models");

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers

        if (!access_token) {
            throw { status: 401, msg: "Invalid token" }
        }

        const data = decode(access_token)

        const user = await Customer.findOne({ where: { id: data.id } })

        if (!user) {
            throw { status: 401, msg: "Invalid token" }
        }

        req.user = user;

        next()

    } catch (err) {
        console.log(err);

        if (err.msg) {
            res.status(err.status).json({ message: err.msg });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = { authentication }