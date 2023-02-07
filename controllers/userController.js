
const { hash, compare, encodeToken } = require('../helpers/helper');
const{User}=require('../models/index')
class Controller{
static async register(req, response) {
      try {
        const { email, password,phoneNumber } = req.body;      
        if(!email||!password||!phoneNumber){
            throw {required:"All input is Required"}
        }

        const user = await User.create({
          email,
          password: hash(password),
          role:'Admin',
          phoneNumber
        });
        response.status(201).json({ id: user.id, email: user.email });
      } catch (error) {
        console.log(error);
        if (error.name === "SequelizeValidationError") {
          response.status(400).json(error.errors[0].message);
        } else if (error.required) {
          response.status(400).json(error);
        } else if (error.name === "SequelizeUniqueConstraintError") {
          response.status(400).json(error.errors[0].message);
        } else {
          response.status(500).json(error.message);
        }
      }
    } 


static async login(req, response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw {
          name: "required",
        };
      }

      let user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw {
          name: "Invalid Login",
        };
      }

      let compareResult = compare(password, user.password);
      if (!compareResult) {
        throw {
          name: "Invalid Login",
        };
      } else {
        const { id, email } = user;
        let token = encodeToken({
          id,
          email,
        });
        console.log(token);
        response.status(200).json({
          token
        });
      }
    } catch (err) {
      response.status(401).json(err)
    }
  }

  static async addProduct(req,response){
    try {
        const {name,price,stock,image,description,CategoryId}=req.body
        const data = await product.create({
            name,
            price,
            stock,
            image,
            description,
            CategoryId
        })
    } catch (error) {
        
    }

  }
}


module.exports=Controller