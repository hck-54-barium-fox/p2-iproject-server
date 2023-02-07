const axios = require("axios");
const { sign } = require("../helper/jwt");
const { hashPassword, compare } = require("../helper/bcryptjs");
const { User, News, MyNews } = require("../models");

class Controller {
  static async getNews(req, res, next) {
    try {
      const { data: programming } = await axios({
        url: "https://programming-posts.p.rapidapi.com/",
        method: "get",
        headers: {
          "X-RapidAPI-Key":
            "0abf58ef94msh97b105eaf4f197ap1dca88jsn3655a32b2e1c",
          "X-RapidAPI-Host": "programming-posts.p.rapidapi.com",
        },
      });

      const corona = { news: [] }; // TODO: ini nanti dihapus kalo api udah bisa diakses lagi
      //   const { data: corona } = await axios({
      //     url: "https://coronavirus-smartable.p.rapidapi.com/news/v1/US/",
      //     method: "get",
      //     headers: {
      //       "X-RapidAPI-Key":
      //         "0abf58ef94msh97b105eaf4f197ap1dca88jsn3655a32b2e1c",
      //       "X-RapidAPI-Host": "coronavirus-smartable.p.rapidapi.com",
      //     },
      //   });

      const { data: movies } = await axios({
        url: "https://movies-news1.p.rapidapi.com/movies_news/recent",
        method: "get",
        headers: {
          "X-RapidAPI-Key":
            "0abf58ef94msh97b105eaf4f197ap1dca88jsn3655a32b2e1c",
          "X-RapidAPI-Host": "movies-news1.p.rapidapi.com",
        },
      });
      let result = [];
      let resultProgramming = programming.map((el, i) => {
        const data = {
          title: el.title,
          description: el.description,
          source: el.source,
        };
        return data;
      });
      let resultCorona = corona.news.map((el, i) => {
        const data = {
          title: el.title,
          description: el.excerpt,
          source: el.originalUrl,
        };
        return data;
      });
      let resultMovies = movies.map((el, i) => {
        const data = {
          title: el.title,
          description: el.description,
          source: el.link,
        };
        return data;
      });

      result.push(...resultMovies, ...resultProgramming, ...resultCorona);
      let temp = result.map((el, i) => {
        return {
          id: i + 1,
          title: el.title,
          description: el.description,
          source: el.source,
        };
      });
      // console.log(temp);
      res.status(200).json(temp);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  static async bookmarks(req, res, next) {
    try {
      const userId = req.user.id;
      console.log(userId);
      console.log("ini masukkk");
      const { title, description, source } = req.body;
      console.log(req.body, `<<<<<<<<`);

      // Ini cuma dipakai untuk ambil News Id yang diperlukan untuk
      // membuat bookmark
      const data = await News.create({ title, description, source });

      const dataBookmark = await MyNews.create({ userId, newsId: data.id });
      // create news
      // create bookmarks
      res.status(201).json(dataBookmark);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async register(req, res, next) {
    const { name, email, password } = req.body;
    try {
      if (!email) {
        throw { name: `Email is required` };
      }
      if (!password) {
        throw { name: `Password is required` };
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

  // static async
}

module.exports = Controller;
