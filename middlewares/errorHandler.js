const errorHandler = (err, req, res, next) => {
  if (err.name === "EmailRequired") {
    res.status(400).json({
      message: "Email is required",
    });
  } else if (err.name === "PasswordRequired") {
    res.status(400).json({
      message: "Password is required",
    });
  } else if (err.name === "InvalidEmailPassword") {
    res.status(400).json({
      message: "Invalid Email/Password",
    });
  } else if (err.name === "SequelizeValidationError") {
    res.status(400).json({
      message: err.errors[0].message,
    });
  } else if (err.name === "SequelizeUniqueConstraintError") {
    res.status(400).json({
      message: err.errors[0].message,
    });
  } else if (err.name === "InvalidToken") {
    res.status(401).json({
      message: "Invalid token",
    });
  } else if (err.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "Invalid token",
    });
  } else if (err.name === "AlreadyPurchased") {
    res.status(400).json({
      message: "You already purchased",
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = errorHandler;
