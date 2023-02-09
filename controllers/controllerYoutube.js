const { default: axios } = require("axios");
const { YTVideo } = require("../models/index");

class ControllerYoutube {
    static async fetchYoutubeVideo(req, res, next){
        try {
            let { data } = await axios({
                method: 'get',
                url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC_F8DoJf9MZogEOU51TpTbQ&order=date&key=AIzaSyC0GrAcIzB9n1JmhUxSxpmDiKen_zz3HJ4`
            })
            let videoData = data.items.map(el => el.id.videoId)
            res.status(200).json(videoData)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = ControllerYoutube;
