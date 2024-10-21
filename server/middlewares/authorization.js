const { Course } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    let { id } = req.params;

    let findC = await Course.findByPk(id);

    if (!findC) {
      throw { name: "DATANOTFOUND" };
    }

    if (req.userId == findC.UserId) {
      next();
    } else {
      throw { name: "FORBIDDEN" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;
