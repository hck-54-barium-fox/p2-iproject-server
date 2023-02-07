const axios = require('axios')
class movieController{
    static async readAllMovies(req, res, next){
        try {
            let { page, sort_by, year, genre } = req.query
            let option = `&page=1`;
            if(page){
                option = `&page=${page}`
            }
            if(sort_by){
                option += `&sort_by=${sort_by}`
            }
            if(year){
                option += `&year=${sort_by}`
            }
            if(genre){
                option += `&with_genres=${genre}`
            }
            console.log(option);
            const { data } = await axios({
                method : 'GET',
                url : `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.SECRET_KEY_OMDB}${option}`,
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
    static async readTrendMovies(req, res, next){
        try {
            let { type, time } = req.query
            // console.log(type);
            let mediaType = 'all'
            let timeMovie = 'week'
            if(type){
                mediaType = type
            }
            if(time){
                timeMovie = time
            }
            // console.log(mediaType,timeMovie);
            const { data } = await axios({
                method : 'GET',
                url : `https://api.themoviedb.org/3/trending/${mediaType}/${timeMovie}?api_key=${process.env.SECRET_KEY_OMDB}`,
            })
            res.status(200).json(data)
        } catch (error) {
            
        }
    }
    static async readSearchMovies(req, res, next){
        try {
            let { search } = req.query
            const { data } = await axios({
                method : 'GET',
                url : `https://api.themoviedb.org/3/search/movie?api_key=${process.env.SECRET_KEY_OMDB}&query=${search}`,
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async getDetailMovie(req, res, next){
        try {
            let { id } = req.params
            const { data } = await axios({
                method : 'GET',
                url : `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.SECRET_KEY_OMDB}`,
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
    static async readTopMovie(req, res, next){
        try {
            let { type, page } = req.query
            let option;
            let pageShow;
            if(type){
                option = type
            }
            if(page){
                pageShow = `page=${page}`
            }
            const { data } = await axios({
                method : 'GET',
                url : `https://api.themoviedb.org/3/movie/${option}?api_key=${process.env.SECRET_KEY_OMDB}&${pageShow}`,
            })
            res.status(200).json(data)
        } catch (error) {

            console.log(error);
        }
    }
    static async readGenreMovies(req, res, next){
        try {
            const { data } = await axios({
                method : 'GET',
                url : `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.SECRET_KEY_OMDB}`,
            })
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = {movieController}