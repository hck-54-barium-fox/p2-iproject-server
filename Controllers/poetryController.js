const { User, Letter } = require("../models");
const nodemailer = require("nodemailer");
const cloudinary = require("../helpers/cloudinary");
// const fs = require("fs");
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

      const createLetter = await Letter.create({
        content: result,
        UserId: req.user.id,
        status: "unpaid",
      });
      res.status(200).json({
        content: result,
        id: createLetter.id,
      });
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
      console.log(letterId);
      if (!letter) {
        throw { name: "notFound" };
      }
      await Letter.update(
        {
          imageUrl: newPath.url,
          status: "paid"
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

  static async letterById(req, res, next) {
    try {
      const { letterId } = req.params;
      const letter = await Letter.findByPk(letterId);
      if (!letter) {
        throw { name: "notFound" };
      }
      res.status(200).json(letter);
    } catch (err) {
      next(err);
    }
  }

  static async sendEmail(req, res, next) {
    try {
      const { email, subject } = req.body;
      const { letterId } = req.params;
      const letter = await Letter.findByPk(letterId);
      if (!letter) {
        throw { name: "notFound" };
      }
      const transporter = nodemailer.createTransport({
        service: "gmail.com",
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD_EMAIL, // generated ethereal password
        },
      });
      const info = await transporter.sendMail({
        from: '"Indra the boy 👻" <rahadyindra16juni.com>', // sender address
        to: email,
        subject,
        html: `
        <div style="display: flex; flex-direction: column;">
        <img style="max-height: 50vh; max-width: 50vh;" src="${letter.imageUrl}"/>
                <p style="width: 500px; margin: auto;">${letter.content}</p>
        </div>
        `,
      });
      res.status(200).json({ message: `message sent ${info.messageId}` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async destroyPoetry(req, res, next) {
    try {
      await Letter.destroy({
        where: {
          status: "unpaid",
        },
      });
      res.status(200).json({
        message: "cleaning letter done",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = PoetryController;
