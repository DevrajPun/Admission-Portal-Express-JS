const CourseModel = require("../models/course");

class CourseController {
  static courseInsert = async (req, res) => {
    try {
      // console.log(req.body);
      const { id } = req.data;
      const { name, email, phone, dob, address, gender, education, course } =
        req.body;
      const result = new CourseModel({
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        gender: gender,
        address: address,
        education: education,
        course: course,
        user_id: id,
      });
      await result.save();
      res.redirect("/courseDisplay");
    } catch (error) {
      console.log(error);
    }
  };
  static courseDisplay = async (req, res) => {
    try {
      // console.log (req.body)
      const { name, email, image } = req.body;
      const data = await CourseModel.find();
      // console.log(data);
      res.render("course/display", {
        n: name,
        i: image,
        e: email,
        d: data,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static courseView = async (req, res) => {
    try {
      // console.log (req.body)
      const { name, email, image } = req.body;
      const data = await CourseModel.findById(req.params.id);
      // console.log(data);
      res.render("course/view", { n: name, i: image, e: email, d: data });
    } catch (error) {
      console.log(error);
    }
  };

  static courseDelete = async (req, res) => {
    try {
      await CourseModel.findByIdAndDelete(req.params.id);
      req.flash("success", "Course Deleted Successfully");
      res.redirect("/courseDisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static courseEdit = async (req, res) => {
    try {
      // console.log (req.body)
      const { name, email, image } = req.body;
      const data = await CourseModel.findById(req.params.id);
      console.log(data);
      res.render("course/edit", { n: name, i: image, e: email, d: data });
    } catch (error) {
      console.log(error);
    }
  };

  static courseUpdate = async (req, res) => {
    try {
      // console.log(req.body);
      const { id } = req.data;
      const { name, email, phone, dob, address, gender, education, course } =
        req.body;
      const update = await CourseModel.findByIdAndUpdate(req.params.id, {
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        gender: gender,
        address: address,
        education: education,
        course: course,
        user_id: id,
      });
      req.flash("success", "Course Updated Successfully");
      res.redirect("/courseDisplay");
    } catch (error) {
      console.log(error);
    }
  };
}
module.exports = CourseController;
