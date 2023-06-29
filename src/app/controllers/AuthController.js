const jwt = require("jsonwebtoken");
const Category = require("../models/Category");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const cookieParser = require("cookie-parser");
const { category } = require("./SiteController");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const salt = 10;
class AuthController {
  //[POST] /auth/register
  async register(req, res, next) {
    const { name, email, password, confirmPassword } = await req.body;

    if (password !== confirmPassword) {
      return res.status(400).json("Mật khẩu và mật khẩu xác nhận không khớp");
    }
    // const name = await req.body.name;
    const hashpassword = await bcrypt.hash(req.body.password, salt);

    await User.findOne({
      email: email,
    })
      .then((data) => {
        if (data) {
          res.json("Email đã tồn tại!");
        } else {
          return User.create({
            name: name,
            email: email,
            password: hashpassword,
          });
        }
      })
      .then((data) => {
        // res.send("Tạo thành công");
        res.redirect("/");
      })
      .catch((err) => {
        res.status(500).json("Đăng ký Thất bại");
      });
  }
  //[POST] /auth/login
  async login(req, res, next) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(422).send("Email or Password is not correct");

    const checkPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!checkPassword)
      return res.status(422).send("Email or Password is not correct");

    const token = jwt.sign(
      { _id: user._id, IsAdmin: user.IsAdmin },
      "${process.env.ACCESS_TOKEN_SECRET}",
      { expiresIn: "30m" }
    );
    res.cookie("auth-token", token);
    res.redirect("/");
  }
  //GET auth/login
  async signin(req, res, next) {
    Category.find({}).then((categorys) => {
      res.render("auth/login", {
        categorys: mutipleMongooseToObject(categorys),
      });
    });
  }

  //GET auth/register
  async signup(req, res, next) {
    Category.find({}).then((categorys) => {
      res.render("auth/register", {
        categorys: mutipleMongooseToObject(categorys),
      });
    });
  }
  //GET
  async logout(req, res, next) {
    res.clearCookie("auth-token");
    res.render("auth/login");
  }
}

module.exports = new AuthController();
