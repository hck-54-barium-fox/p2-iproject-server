
const authentication = async (req, res, next) => {
    try {
        let { access_token } = req.headers
        if (!access_token) {
            throw { name: "InvalidToken" };
        }

        

    } catch (error) {
        
    }
}