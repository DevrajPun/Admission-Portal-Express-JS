const UserModel = require("../models/user");
const TeacherModel = require("../models/teacher");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dtxgg3d3o",
  api_key: "119619854754151",
  api_secret: "Gde5wBQXa30w6ppfTRa5oCbeE1Q",
});

class FrontController {
  static login = async (req, res) => {
    try {
      res.render("login", {
        msg: req.flash("Success"),
        msg1: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static register = async (req, res) => {
    try {
      res.render("register", { msg: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };
  static home = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      res.render("home", { n: name, i: image, e: email });
    } catch (e) {
      console.log(e);
    }
  };
  static about = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      res.render("about", { n: name, i: image });
    } catch (e) {
      console.log(e);
    }
  };
  static contact = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      res.render("contact", { n: name, i: image });
    } catch (e) {
      console.log(e);
    }
  };

  // Insert User
  static insertUser = async (req, res) => {
    try {
      // console.log("Data Inserted");
      // console.log(req.body);
      //console.log(req.files.image);
      const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      //console.log(imageUpload);
      const { n, e, p, cp } = req.body;
      const user = await UserModel.findOne({ email: e });
      // console.log(user)
      if (user) {
        req.flash("error", "Email Already Exits.");
        res.redirect("/register");
      } else {
        if (n && e && p && cp) {
          if (p == cp) {
            const hashPassword = await bcrypt.hash(p, 10);
            const result = new UserModel({
              name: n,
              email: e,
              password: hashPassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            await result.save();
            req.flash("Success", "Registration Successful! Please Login.");
            res.redirect("/"); //url
          } else {
            req.flash("Error", "Password Not Match");
            res.redirect("/register'");
          }
        } else {
          req.flash("error", "All Fields Are Required");
          req.redirect("/register");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body);
      const { email, password } = req.body;
      //console.log(req.body);
      const user = await UserModel.findOne({ email: email });
      // console.log(user)
      if (user != null) {
        const ismatch = await bcrypt.compare(password, user.password);
        // console.log(ismatch)
        if (ismatch) {
          // token
          const token = jwt.sign({ ID: user._id }, "secretkeyhaikuchbhilikhlo");
          // console.log(token)
          res.cookie("token", token);
          res.redirect("/home");
        }
      } else {
        req.flash("error", "You are not a registered user");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static Logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static Profile = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      res.render("profile", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = FrontController;
