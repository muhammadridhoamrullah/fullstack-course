const { comparePass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
let { User, Course, MyCourse } = require("../models/index");

class Controller {
  static async register(req, res, next) {
    try {
      let { email, name, password } = req.body;

      let newUser = await User.create({
        email,
        name,
        password,
      });

      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email) {
        throw { name: "NO_EMAIL" };
      }
      if (!password) {
        throw { name: "NO_PASSWORD" };
      }

      let findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "INVALIDEMAILPASS" };
      }

      let comparingPassword = comparePass(password, findUser.password);

      if (!comparingPassword) {
        throw { name: "INVALIDEMAILPASS" };
      }

      let access_token = signToken({ id: findUser.id });

      res.json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCourses(req, res, next) {
    try {
      let data = await Course.findAll();

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addCourse(req, res, next) {
    try {
      const { courseId } = req.params;

      let checkCourse = await Course.findOne({
        where: {
          id: courseId,
        },
      });

      //   console.log(checkCourse, " checkcourse");

      if (!checkCourse) {
        throw { name: "DATANOTFOUND" };
      }

      let checkMyCourse = await MyCourse.findOne({
        where: {
          UserId: req.userId,
          CourseId: courseId,
        },
      });

      //   console.log(checkMyCourse, "check my course");
      if (checkMyCourse) {
        throw { name: "DUPLICATE" };
      }

      let addToMyCourse = await MyCourse.create({
        UserId: req.userId,
        CourseId: courseId,
      });

      //   console.log(addToMyCourse, "check add");
      res.status(201).json(addToMyCourse);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async myCourses(req, res, next) {
    try {
      let data = await MyCourse.findAll(
        {
          include: Course,
        },
        {
          where: {
            UserId: req.userId,
          },
        }
      );

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async editMyCourse(req, res, next) {
    try {
      let { id } = req.params;

      await MyCourse.update(
        {
          status: "Completed",
        },
        {
          where: {
            id,
          },
        }
      );

      res.json({
        message: "Course has been completed",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
