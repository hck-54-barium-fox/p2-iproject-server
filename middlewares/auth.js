const { verifyToken } = require("../helpers/jwt")
const { User, Item, Category } = require('../models');
const { post } = require("../routes");

async function authentication(req, res, next) {
    try {
        let { access_token } = req.headers
        let verify = verifyToken(access_token)

        let user = await User.findOne({
            where: { id: verify.id }
        })
        if (!user) {
            throw { name: 'unauthorized' }
        }
        req.user = {
            id: user.id, role: user.role, email: user.email, username: user.username
        }
        next()
    } catch (error) {
        next(error)
    }
}

// async function authorization(req, res, next) {
//     try {
//         let { id } = req.params
//         let itemData = await Item.findByPk(id)

//         if (!itemData) {
//             throw { name: 'error not found' }
//         }

//         if (req.user.role === 'Admin') {
//             next()

//         }
//         // else {
//         //     console.log(req.user);
//         //     if (req.user.id === itemData.authorId) {
//         //         next()
//         //     } 
//         //     else {
//         //         throw { name: 'forbidden' }
//         //     }
//         // }
//     } catch (error) {
//         next(error)
//     }
// }

// async function authorizationStatus(req, res, next) {
//     try {
//         let { id } = req.params
//         let movieData = await Movie.findByPk(id)

//         if (!movieData) {
//             throw { name: 'not found' }
//         }
//         console.log(req.user.role);
//         if (req.user.role === 'Admin') {
//             next()
//         } else {
//             throw { name: 'forbidden' }
//         }
//     } catch (error) {
//         next(error)
//     }
// }

// async function authenticationCustomer(req, res, next) {
//     try {
//         let { access_token } = req.headers
//         let verify = verifyToken(access_token)
//         let customer = await Customer.findOne({
//             where: { id: verify.id }
//         })
//         if (!customer) {
//             throw { name: 'unauthorized' }
//         }
//         req.customer = {
//             id: customer.id, role: customer.role, email: customer.email
//         }
//         // console.log(req.customer, '?????????????????????????');
//         next()
//     } catch (error) {
//         next(error)
//     }
// }

module.exports = authentication