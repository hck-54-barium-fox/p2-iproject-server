const { decodeToken, decodeTokenCust } = require("../helper/jwt")
const { User, Post, Category, Customer } = require('../models/index')

const authentication = async (req, res, next) => {
    try {
        // console.log(req.headers)
        const { access_token } = req.headers;
        if (!access_token) {
            throw { message: "invalid token" }
        }
        const data = decodeToken(access_token);
        const user = await User.findByPk(data.id);
        // console.log(user)
        if (!user) {
            throw { message: 'invalid token' }
        }

        req.user = user;

        next()
    } catch (error) {
        next(error)
    }
}

const authorization = async (req, res, next) => {
    try {
        const { id } = req.params

        const post = await Post.findByPk(id)

        if (!post) {
            throw { message: "data not found" }
        }
        if (req.user.role !== "Admin") {
            // throw {message: "forbidden to acces"}
            if (req.user.id !== post.authorId) {
                throw { message: "forbidden to access" }
            }
        }

        next()
    } catch (error) {
        // console.log(error)
        // res.status(500).json(error)
        next(error)
    }
}


module.exports = { authentication, authorization }