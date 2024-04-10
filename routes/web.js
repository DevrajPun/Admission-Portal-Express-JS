const express = require("express");
const FrontController = require("../controllers/FrontController");
const route = express.Router();
const checkUseAuth = require("../middleware/auth");
const CourseController = require("../controllers/CourseController");

// route localhost:4000(/)
route.get("/", FrontController.login);
route.get("/register", FrontController.register);
route.get("/home", checkUseAuth, FrontController.home);
route.get("/about", checkUseAuth, FrontController.about);
route.get("/contact", checkUseAuth, FrontController.contact);
// route.get("/team", FrontController.team);

//insert user

route.post("/insertuser", FrontController.insertUser);
route.post("/verifyLogin", FrontController.verifylogin);
route.get("/logout", FrontController.Logout);
route.get("/profile",checkUseAuth, FrontController.Profile);

// Course controller
route.post("/course_insert", checkUseAuth, CourseController.courseInsert);
route.get("/courseDisplay", checkUseAuth, CourseController.courseDisplay);
route.get("/courseView/:id", checkUseAuth, CourseController.courseView);
route.get("/courseEdit/:id", checkUseAuth, CourseController.courseEdit);
route.get("/courseDelete/:id", checkUseAuth, CourseController.courseDelete);
route.post("/courseUpdate/:id", checkUseAuth, CourseController.courseUpdate);

module.exports = route;
