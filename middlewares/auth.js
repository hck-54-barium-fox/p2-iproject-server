const { verifyToken } = require('../helpers')
const { Bookmark, User } = require('../models/index')

const authentication = async (req, res, next) => {
    const { access_token } = req.headers;
    
    if(access_token){
        try {
            const data = verifyToken(access_token);
            
            const auth = await User.findByPk(data.id)

            if(auth){
                req.user = auth
                next()
            } else {
                res.status(401).json({message: "Invalid token"})
            }
        } catch (error) {
            res.status(401).json({message: "Invalid token"})
        }
    } else {
        res.status(401).json({message: "Invalid token"})
    }
}

const authorization = async (req, res, next) => {
    const bookmarkId = +req.params.id
    
    try {
        const bookmarkExist = await Bookmark.findByPk(bookmarkId)
        
        if(bookmarkExist){
            if(req.user.role !== 'Admin'){
                if(req.user.id !== bookmarkExist.UserId ){
                    res.status(403).json({message: "You are not authorize"})
                } else {
                    next()
                }
            } else {
                next()
            }
        } else {
            res.status(404).json({message: `Bookmark with ID ${bookmarkId} is not found`})
        }
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}

const adminAuthorization = async (req, res, next) => {
    if(req.user.role !== 'Admin'){
        res.status(403).json({message: "You are not authorize for admin activities"})
    } else {
        next()
    }
}

module.exports = {authentication, authorization, adminAuthorization}