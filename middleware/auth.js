const { decodeToken } = require("../helpers/jwt");
const { User, Food, Category, Customer } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) throw { status: 401, msg: "Please login first" };

    const dataToken = decodeToken(access_token);

    const user = await User.findByPk(dataToken.id);

    if (!user) throw { status: 401, msg: "Please login first" };
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
const authorization = async (req, res, next) => {
  try {
    const foodData = await Food.findByPk(+req.params.id);
    if (!foodData) throw { status: 404, msg: "Food not found" };
    if (+req.user.id !== foodData.authorId && req.user.role !== "admin") {
      throw { status: 403, msg: "You are forbidden to perform this" };
    }
    next();
  } catch (error) {
    next(error);
  }
};
const authorizationCategory = async (req, res, next) => {
  console.log(req.user)
  try {
    const categoryData = await Category.findByPk(+req.params.id);
    if (!categoryData) throw { status: 404, msg: "Category not found" };
    if (+req.user.id !== categoryData.authorId && req.user.role !== "admin") {
      throw { status: 403, msg: "You are forbidden to perform this" };
    }
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
}
const authorizationEdit = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw { status: 403, msg: "You are forbidden to perform this" };
    }
    next();
  } catch (error) {
    console.log(error)
    next(error);
  }
}
const authenticationCustomer = async (req, res, next) => {
  try {
    let {access_token} = req.headers
    if (!access_token) throw { status: 401, msg: "Please login first" };

    const dataToken = decodeToken(access_token);
    const customer = await Customer.findByPk(dataToken.id)
    console.log(customer, 'inicustomer')
    if (!customer) throw { status: 401, msg: "Please login first" };
    
    req.customer = customer
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}

module.exports = { authorization, authentication, authorizationCategory, authorizationEdit, authenticationCustomer };
