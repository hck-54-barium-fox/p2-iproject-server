const axios = require('axios');

class Controller {

    static async googleLogin(req, res, next) {
        try {
            const CLIENT_ID = process.env.CLIENT_ID
            const client = new OAuth2Client(CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: req.body.google_token,
                audience: CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.given_name,
                    email: payload.email,
                    password: "12345",
                    phoneNumber: "",
                    address: ""
                },
                hooks: false
            });
            let access_token = sign({
                id: user.id,
                username: user.username

            })
            // console.log(access_token, '<< 115');
            res.status(200).json({ access_token, username: user.username })
            // console.log(token, '<<<<< token');
            // lempar access token dan username ke client


        } catch (err) {
            // console.log(error, '<<<<< google login');
            next(err)
        }
    }

}


module.exports = Controller