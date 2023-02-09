const { User, MyCart } = require("../models/index");
const { compare } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");
const axios = require("axios");
const url = "https://makeup-api.herokuapp.com/api/v1/products.json";
const nodemailer = require("../helpers/nodemailer");
const midtransClient = require("midtrans-client");

// const { OAuth2Client } = require('google-auth-library');

class Controller {
  static async register(req, res, next) {
    try {
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      nodemailer(user.email);
      res.status(201).json({
        message: "Input data User succeed",
        id: user.id,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: { email },
      });
      if (!user || !compare(password, user.password)) {
        throw { name: "Invalid login" };
      } else {
        const { id, email } = user;
        let token = sign({
          id,
          email,
        });
        res.status(200).json({
          access_token: token,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async fetchProducts(req, res, next) {
    try {
      const { data } = await axios({
        methods: "GET",
        url: `${url}`,
      });
      let sliceData = data.slice(0, 12);
      res.status(200).json(sliceData);
    } catch (err) {
      next(err);
    }
  }

  static async addCart(req, res, next) {
    try {
      const UserId = req.user.id;
      const ProductId = req.params.productId;
      const product_api_url = req.body.product_api_url;
      const data = await MyCart.create({
        UserId,
        ProductId,
        product_api_url,
        status: "unpaid",
      });
      res.status(201).json({
        message: "add to cart",
      });
    } catch (err) {
      next(err);
    }
  }

  static async fetchMycart(req, res, next) {
    try {
      const UserId = req.user.id;
      const data = await MyCart.findAll({ where: { UserId, status:'unpaid' } });
      if(!data){
        throw {name: "Data not found"}
      }
      res.status(200).json(data);
    } catch (err) {
        next(err)
    }
  }

  static async updateStatus(req, res, next) {
    try {
        const UserId = req.user.id
      await MyCart.update(
        {
          status: "paid",
        },
        {
          where: {
            UserId
          },
        }
      );
      res.status(200).json({
        message: "The receipt will be send to your email shorlty!",
      });
    } catch (err) {
        next(err)
    }
  }

  static async removeitem(req, res, next) {
    try {
        const id = req.params.id
        await MyCart.destroy({
            where:{id}
        })
        res.status(200).json({
            message:"Delete success"
        })
    } catch (err) {
      res.status(500).json({
        message: "error",
      });
    }
  }

  static async rajaOngkir(req, res, next){
    try{
        const { data } = await axios({
            method: 'GET',
            url: 'https://api.rajaongkir.com/starter/city',
            headers:{
                key: process.env.RAJAONGKIR_KEY
            },
        })
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({
            message: "Error"
        })
    }
  }

  static async feeDelivery(req, res, next){
    try{
        let courier = "jne"
        const { destination } = req.query;
        const form = {
            origin: '153',
            destination,
            weight: 100,
            courier
        }
        const { data } = await axios({
            method: 'POST',
            url: 'https://api.rajaongkir.com/starter/cost',
            data: form,
            headers:{
                key: process.env.RAJAONGKIR_KEY
            }
        })
        const result = data.rajaongkir.results[0].costs[0].cost[0].value

        res.status(201).json(result)
    }
    catch(err){
       next(err);
    }
  }

  static async midtrans(req, res, next) {
    try {
      const amount = req.query.amount;
      const UserId = req.user.id;
      const findMyCart = await MyCart.findOne({
        where: { UserId },
      });
    //   if (findMyCart.status == "paid") {
    //     throw { name: "already subscribe" };
    //   }

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: `${amount * 15000}`,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: req.user.username,
          email: req.user.email,
        },
      };

      let token = await snap.createTransaction(parameter);
      res.status(201).json(token);

    } catch (err) {
      next(err)
    }
  }
}

module.exports = Controller;
