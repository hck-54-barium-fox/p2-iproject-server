const axios = require("axios");
const { sign } = require("../helper/jwt");
const { hashPassword, compare } = require("../helper/bcryptjs");
const { User, News, MyNews } = require("../models");
let search = null;

class Controller {
  static async getNews(req, res, next) {
    try {
      let output = [];
      const { q } = req.query;
      search = q;
      const { data: programming } = await axios({
        url: "https://programming-posts.p.rapidapi.com/",
        method: "get",
        headers: {
          'X-RapidAPI-Key': '13970d4c06msh86ef00eab866ea8p1d8134jsn221f5ddf1f7c',
          'X-RapidAPI-Host': 'programming-posts.p.rapidapi.com'
        }
      });

      const { data: corona } = await axios({
        url: "https://coronavirus-smartable.p.rapidapi.com/news/v1/US/",
        method: "get",
        headers: {
          'X-RapidAPI-Key': '13970d4c06msh86ef00eab866ea8p1d8134jsn221f5ddf1f7c',
          'X-RapidAPI-Host': 'coronavirus-smartable.p.rapidapi.com'
        }
      });
      // console.log(corona, corona.length, `INIcorona`);

      // const corona = { news: [] };
      const { data: movies } = await axios({
        url: "https://movies-news1.p.rapidapi.com/movies_news/recent",
        method: "get",
        headers: {
          'X-RapidAPI-Key': '24095424f5mshfd02d5df6508194p1893d7jsn67137544d23d',
          'X-RapidAPI-Host': 'movies-news1.p.rapidapi.com'
        }
      });
      let result = [];
      let resultProgramming = programming.map((el, i) => {
        const data = {
          title: el.title,
          description: el.description,
          source: el.source,
          theme: "Programming",
        };
        return data;
      });
      let resultCorona = corona.news.map((el, i) => {
        const data = {
          title: el.title,
          description: el.excerpt,
          source: el.originalUrl,
          theme: "Corona",
        };
        return data;
      });
      let resultMovies = movies.map((el, i) => {
        const data = {
          title: el.title,
          description: el.description,
          source: el.link,
          theme: "Movies",
        };
        return data;
      });
      console.log(
        resultMovies.length,
        resultCorona.length,
        resultProgramming.length,
        `<<<<<<<ININ`
      );
      result.push(...resultMovies, ...resultProgramming, ...resultCorona);
      let temp = result.map((el, i) => {
        return {
          id: i + 1,
          title: el.title,
          description: el.description,
          source: el.source,
          theme: el.theme,
        };
      });
      // console.log(`<<<<<<<<<TRY>>>>>>>>></TRY>`);
      if (search) {
        temp.forEach((el) => {
          if (
            el.title.toLowerCase().search(search) > -1 ||
            el.theme.toLowerCase().search(search) > -1
          )
            output.push(el);
        });
        res.status(200).json(output);
      } else res.status(200).json(temp);
    } catch (error) {
      let data = require("../news-api-sample-data.json");
      let output = [];
      if (error.name === "AxiosError") {
        // console.log(`<<<<<<<<<<<<<Error>>>>>>>()`);
        if (search) {
          data.forEach((el) => {
            if (
              el.title.toLowerCase().search(search) > -1 ||
              el.theme.toLowerCase().search(search) > -1
            )
              output.push(el);
          });
          res.status(200).json(output);
        } else res.status(200).json(data);
      } else {
        res.status(500).json(error);
      }
      // console.log(error);
    }
  }



  static async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      if (!name) {
        throw { name: `Name is required` };
      }
      if (!email) {
        throw { name: `Email is required` };
      }
      if (!password) {
        throw { name: `Password is required` };
      }
      if (password.length < 5) {
        throw { name: `Password minimum 5 character` };
      }
      const data = await User.create({ name, email, password });
      res.status(201).json({ id: data.id, name: data.name, email: data.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // console.log(req.body);
      if (!email) {
        throw { name: `Email is required` };
      }
      if (!password) {
        throw { name: `Password is required` };
      }
      const data = await User.findOne({ where: { email: email } });
      if (!data) {
        throw { name: `Invalid email/password` };
      }
      const isValid = compare(password, data.password);
      if (!isValid) {
        throw { name: `Invalid email/password` };
      }
      const payload = { id: data.id, email: data.email };
      const access_token = sign(payload);
      res.status(200).json({ access_token: access_token });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async loginGoogle(req, res, next){
    try{
      // const {google_token} = req.headers
      const client = new OAuth2Client(process.env.CLIENT_ID_GOOGLE);
      const ticket = await client.getPayload({
        idToken: req.body.idToken,
        audience: process.env.CLIENT_ID,
      });
      // console.log(ticket, `>>.<><><><><><>`);
      const payload = ticket.getPayload();
      // console.log(payload);
      const { email, name } = payload;
      const [user, create] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          username: name,
          email,
          password: "hidden",
        },
        hooks: false,
      });
      const access_token = sign({
        id: user.id,
      });
      res
        .status(200)
        .json({
          id: user.id,
          access_token,
          username: user.id,
        });
    }catch(error){
      next(error)
    }
  }
}

module.exports = Controller;
