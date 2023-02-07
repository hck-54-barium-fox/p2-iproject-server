const { User, Playlist, Movies } = require('../models/index')
const axios = require('axios')
class playlistController {
    static async addPlaylist(req, res, next){
        try {
            let { movieId } = req.params
            const { data } = await axios({
                method : 'GET',
                url : `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.SECRET_KEY_OMDB}`,
            })
            // console.log(data);
         const movies =   await Movies.create({
                idMovie : data.id,
                title : data.original_title,
                overview : data.overview,
                poster : data.poster_path
            })
        const playlist = await Playlist.create({
            watchTime : new Date (),
            UserId : req.userLogin.id,
            MovieId : movies.id
        })
            res.status(201).json(movies)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { playlistController }