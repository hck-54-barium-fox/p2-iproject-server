const { response } = require("express");
const { User, Product, Category, Invoice } = require("../models/index");
const axios = require("axios");
const midtransClient = require('midtrans-client');
const SerpApi = require("google-search-results-nodejs");
const { Op } = require("sequelize");
const search = new SerpApi.GoogleSearch(
  "679452ad15d0cf482efe2bd7ad4878369698076f0b5c2bd44d9c9373c8a10484"
);

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
        status:'Unpaid'
      });
      response.status(200).json(data);
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }

  static async findAnimal(req, response) {
    try {
      const name = req.query.name;
      console.log(name);
      const { data } = await axios({
        method: "GET",
        url: "https://animals-by-api-ninjas.p.rapidapi.com/v1/animals",
        params: { name: name },
        headers: {
          "X-RapidAPI-Key":
            "fd32907c3amshd16b823d7e1ba07p1a4f98jsnee295af8773a",
          "X-RapidAPI-Host": "animals-by-api-ninjas.p.rapidapi.com",
        },
      });

      if (data.length) {
        const searchQuery = data[0].name;
        console.log(searchQuery);

        const params = {
          q: searchQuery, // what we want to search
          engine: "google", // search engine
          hl: "en", // parameter defines the language to use for the Google search
          gl: "us", // parameter defines the country to use for the Google search
          tbm: "isch", // parameter defines the type of search you want to do (isch - Google Images)
        };

        const getJson = () => {
          return new Promise((resolve) => {
            search.json(params, resolve);
          });
        };

        const getResults = async () => {
          const imagesResults = [];
          const json = await getJson();
          if(json.images_results) {
            console.log(json.images_results, '<<< ini json')
            imagesResults.push(json.images_results[0])
          } else {
            throw { message: "google" }
          }
        //   while (true) {
        //     const json = await getJson();
        //     if (json.images_results) {
        //       imagesResults.push(...json.images_results);
        //       params.ijn ? (params.ijn += 1) : (params.ijn = 1);
        //     } else break;
        //   }
          return imagesResults;
        };
        const result = await getResults();

        const image = result[0].original;
        response.status(200).json({ data, image });
      } else {
        throw { message: "animal" };
      }
    } catch (error) {
      if(error.message){
        response.status(400).json(error.message)
      }else{
        response.status(500).json(error)
      }
    }
  }
  static async findCat(req, response) {
    try {
      const name = req.query.name;
      console.log(name);
      const { data } = await axios({
        method: "GET",
        url: "https://cats-by-api-ninjas.p.rapidapi.com/v1/cats",
        params: { name: name },
        headers: {
          "X-RapidAPI-Key":
            "fd32907c3amshd16b823d7e1ba07p1a4f98jsnee295af8773a",
          "X-RapidAPI-Host": "cats-by-api-ninjas.p.rapidapi.com",
        },
      });
      response.status(200).json(data);
    } catch (error) {
      console.log(error);
      response.status(500).json(error);
    }
  }
  static async fetchCheckout(req,response){
    try {
        const UserId=req.user.id
        console.log(UserId);
        
        const data= await Invoice.findAll({
            include:Product,
            where:{
                UserId:{
                    [Op.eq]:UserId
                }
            }
        })
        // console.log(data);
        response.status(200).json(data)
    } catch (error) {
        console.log(error);
        response.status(500).json(error)   
    }
  }
  static async deleteCheckout(req,response){
    try {
        const id=req.params.id
        const data= await Invoice.destroy({
            where:{
                id
            }
        })
        response.status(200).json(data);
    } catch (error) {
        response.status(500).json(error)
    }
  }
  static async checkout(req,response){
    try {

        const user = await User.findByPk(req.user.id)
        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : 'SB-Mid-server-Eu_prUEDontUM8Xy5RcFUqd6'
        });

        let parameter = {
            "transaction_details": {
                "order_id": "YOUR-ORDERID"+ Math.floor(100000 + Math.random()*9000000),
                "gross_amount": 200000
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "email": user.email,
            }
        };

        const midtransToken= await snap.createTransaction(parameter)
        
        response.status(201).json(midtransToken)

    } catch (error) {
        console.log(error);
    }
  }
  static async paid(req,response){
    try {
        const id = req.params.id
        const data = await Invoice.update(
            { status: 'Paid' },
            { where: { id  } }
          )
          response.status(200).json(data)
    } catch (error) {
        response.status(500).json(error)
    }
  }
}

module.exports = CustomerController;
