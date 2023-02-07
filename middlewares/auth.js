const { decodeToken } = require("../helpers/helper");
const { User,Inventory } = require("../models/index");

const authentication = async (req, response, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        name: "InvalidToken",
      };
    }

    const data = decodeToken(access_token);
    const user = await User.findOne({
      where: {
        id: data.id,
      },
    });

    if (!user) {
      throw {
        name: "InvalidToken",
      };
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
   response.status(401).json(err)
  }
};



const authorization = async (req, response, next) => {
  try {
    const id = req.params.id;
    const inventory = await Inventory.findOne({
      where: {
        id: id,
      },
    });
    if (!inventory) {
      throw {
        name: "Not Found",
      };
    }
    
      if (req.user.id !== inventory.UserId) {
        throw {
          name: "Forbidden",
        };
    
    }
    next();
  } catch (err) {
    response.status(403).json(err)
  }
};





module.exports = {
  authentication,
  authorization,
};
