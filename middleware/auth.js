const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const checkUseAuth = async (req, res, next) => {
  // console.log("hello auth");
  const {token} = req.cookies;
  // console.log(token)
  if (!token) {
    req.flash("error", "Unauthorised user please login");
    res.redirect("/");
  } else {
    const verifyLogin = jwt.verify(token, "secretkeyhaikuchbhilikhlo");
    // console.log(verifyLogin);
    const data = await UserModel.findOne({_id: verifyLogin.ID});
    // console.log(data);
    req.data = data;

    next();
  }
};

module.exports = checkUseAuth;
