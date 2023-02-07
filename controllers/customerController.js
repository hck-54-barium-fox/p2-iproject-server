const { response } = require("express");
const { User, Product, Category, Invoice } = require("../models/index");
const axios = require("axios");

class CustomerController {
  static async detailProduct(req, response) {
    try {
      const id = req.params.id;
      const data = await Product.findOne({
        where: {
          id,
        },
      });

      response.status(200).json(data);
    } catch (error) {
      response.status(500).json(error);
    }
  }
  static async buyProduct(req, response) {
    try {
      const ProductId = req.params.id;
      const UserId = req.user.id;
      const product = await Product.findOne({
        attributes: ["price"],
        where: {
          id: ProductId,
        },
      });
      let totalPrice = product.price;
      const data = await Invoice.create({
        ProductId,
        UserId,
        totalPrice,
      });
      response.status(200).json(data);
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }

  static async findAnimal(req, response) {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://animals-by-api-ninjas.p.rapidapi.com/v1/animals",
        params: { name: "bird" },
        headers: {
          "X-RapidAPI-Key":
            "fd32907c3amshd16b823d7e1ba07p1a4f98jsnee295af8773a",
          "X-RapidAPI-Host": "animals-by-api-ninjas.p.rapidapi.com",
        },
      });
      response.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
  static async findCat(req, response) {
    try {
        const name=req.query.name    
        const {data} = await axios ({
          method: "GET",
          url: "https://cats-by-api-ninjas.p.rapidapi.com/v1/cats",
          params: { name: name },
          headers: {
            "X-RapidAPI-Key": "fd32907c3amshd16b823d7e1ba07p1a4f98jsnee295af8773a",
            "X-RapidAPI-Host": "cats-by-api-ninjas.p.rapidapi.com",
          },
        });
        response.status(200).json(data)
    } catch (error) {
        response.status(500).json(error)
    }
  }
}

module.exports = CustomerController;
