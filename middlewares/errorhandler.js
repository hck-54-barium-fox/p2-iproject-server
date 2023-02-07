function errorHandler(err, req, res, next) {
 
     if (err.name === "notFound") {
      res.status(404).json({
        msg: "Error data not found",
      });
    } else if (err.name === "Invalid token" || err.name === "JsonWebTokenError") {
      res.status(401).json({
        msg: "Invalid token",
      });
    } else if (err.name === "loginFirst") {
      res.status(401).json({
        msg: "You must login first",
      });
    } else if (err.name === "forbidden") {
      res.status(403).json({
        msg: "You don't have permission to do this action",
      });
    } else {
      res.status(500).json({
        msg: "Something is wrong with the server",
      });
    }
  }
  
  module.exports = errorHandler;
  