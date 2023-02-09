const cloudinary = require('../middleware/cloudinary')

async function uploadFoto(content) {
    try {
        return await cloudinary.uploader(content)
    } catch (err) {
        throw err
    }
}

module.exports = uploadFoto