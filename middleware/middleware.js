const { decodepayload } = require('../helpers/jwt')
const { Player, User, Transaction } = require('../models')

async function authentication(request, response, next) {
    try {
        console.log(request.headers, '<<<<');
        let { access_token } = request.headers
        if (!access_token) {
            console.log('test')
            // throw {name: "unauthenticated"}
            response.status(403).json({message: 'Invalid Token'})
        }
        let payload = decodepayload(access_token)
        let dataUser = await User.findByPk(payload.id)
        if (!dataUser) {
            // console.log('test2');
            // throw {name: "unauthenticated"}
            console.log('ini masuk ye');
            // throw new ErrorClass(403, "You must login first")
            response.status(403).json({message: 'Invalid Token'})
        }
        request.user = { id: dataUser.id, email: dataUser.email, username: dataUser.username }
        next()

    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            response.status(401).json({messsage: `Invalid Token`})
        } else {
            response.status(500).json({message: `Internal server error`})
        }
        
    }
}

// async function authorization(request, response, next) {
//     try {
//         let {id} = request.params
//         // console.log(id);
//         // let {types} = request.body
//         let dataFind = await Post.findByPk(id)
//         // if (types === "Category") {
//         //     console.log(types, "<<<");
//         //     dataFind = await Category.findByPk(id)
//         // } else if (types === "Post") {
//         //     dataFind = await Post.findByPk(id)
//         // }
//         if (!dataFind) {
//             throw new ErrorClass (404, 'Not found')
//         }
//         // if (request.user.role === 'admin') {
//             //     next()
//             // } else {
//                 //     if (request.user.id === dataFind.authorId) {
//                     //         next ()
//                     //     } else {
//                         //         throw new ErrorClass ('forbidden', 401, 'Forbidden')
//                         //     }
//                         // }
//         let data = await User.findByPk(request.user.id)
//         console.log(data.dataValues.role, '<<<');
//         if (data.dataValues.role !== 'admin') {
//             console.log(data.role);
//             if (request.user.id !== dataFind.authorId) {
//                 console.log(request.user.id !== dataFind.authorId, request.user.id, "!==", dataFind.authorId);
//                 throw new ErrorClass(403, 'Forbidden')
//             }
//             // throw new ErrorClass(403, 'Forbidden')
//         }
//         // console.log('masuk');
//         next()
//     } catch (error) {
//         // if (error.name === 'Not found') {
//         //     response.status(404).json({message: 'Post not found'})
//         // } else if (error.name === 'Forbidden') {
//         //     response.status(403).json({message: 'Forbidden'})
//         // } else {
//         //     console.log(error);
//         //     response.status(500).json({message: 'Internal Server error'})
//         // }
//         next(error)
//     }
// }


module.exports = { authentication}