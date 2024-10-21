function errorHandliing(error, req, res, next) {
  if (error.name === "SequelizeValidationError" || "SequelizeValidationError") {
    let errors = error.errors.map((el) => {
      return el.message;
    });
    res.status(400).json({
      message: errors[0],
    });
  } else if (error.name === "NO_EMAIL") {
    res.status(400).json({
      message: "Email is required",
    });
  } else if (error.name === "NO_PASSWORD") {
    res.status(400).json({
      message: "Password is required",
    });
  } else if (error.name === "INVALIDEMAILPASS") {
    res.status(401).json({
      message: "Invalid email/password",
    });
  } else if (error.name === "DATANOTFOUND") {
    res.status(404).json({
      message: "Course not found",
    });
  } else if (error.name === "DUPLICATE") {
    res.status(400).json({
      message: "Can't add the same course",
    });
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({
      message: "Invalid token",
    });
  } else if (error.name === " FORBIDDEN") {
    res.status(403).json({
      message: "You are not authorized",
    });
  } else {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = errorHandliing;
