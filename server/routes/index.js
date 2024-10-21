const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const errorHandliing = require("../middlewares/errorHandling");

const router = require("express").Router();

router.post("/register", Controller.register);

router.post("/login", Controller.login);
router.use(authentication);
router.get("/courses", Controller.getCourses);
router.post("/mycourses/:courseId", Controller.addCourse);

router.get("/mycourses", Controller.myCourses);

router.patch("/mycourses/:id", authorization, Controller.editMyCourse);

router.use(errorHandliing);
module.exports = router;
