const { User, Letter } = require("../models");
const nodemailer = require("nodemailer");
const cloudinary = require("../helpers/cloudinary");
const fs = require("fs");
const axios = require("axios");

class PoetryController {
  static async getLetterPerSearch(req, res, next) {
    try {
      const { search } = req.params;
      const { data } = await axios({
        method: "GET",
        url: `https://poetrydb.org/title/${search}/lines.json`,
      });
      if (data.status === 404) {
        throw { name: "notFound" };
      }
      const choose = Math.ceil(Math.random() * data.length - 1);
      const result = data[choose].lines.join(" ");
      
      await Letter.create({
        content: result,
        UserId: req.user.id,
        status: "unpaid",
      });

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getMyLetter(req, res, next) {
    try {
      const getMyLetter = await Letter.findAll({
        where: {
          UserId: req.user.id,
          status: "paid",
        },
      });
      res.status(200).json(getMyLetter);
    } catch (err) {
      next(err);
    }
  }
  static async uploadImage(req, res, next) {
    try {
      const uploader = async (path) => await cloudinary.uploads(path, "Images");
      const { letterId } = req.params;
      const { path } = req.file;
      const newPath = await uploader(path);
      const letter = await Letter.findByPk(letterId);
      if (!letter) {
        throw { name: "notFound" };
      }
      await Letter.update(
        {
          imageUrl: newPath.url,
        },
        {
          where: {
            id: letterId,
          },
        }
      );
      res.status(201).json({
        message: "Upload image is successful",
        data: newPath,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = PoetryController;
