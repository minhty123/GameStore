const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../app/models/User");
module.exports = (req, res, next) => {
  const token = req.cookies["auth-token"];

  if (!token) return res.redirect("/auth/login");

  try {
    const verified = jwt.verify(token, "${process.env.ACCESS_TOKEN_SECRET}");
    User.findOne({ _id: verified._id })
      .then((user) => {
        if (!user) {
          return res.redirect("/auth/login");
        }

        // Lưu thông tin người dùng vào req để sử dụng trong middleware tiếp theo
        req.user = user;

        next();
      })
      .catch((err) => {
        console.error("Error:", err);
        return res.redirect("/auth/login");
      });
  } catch (err) {
    return res.redirect("/auth/login");
  }
};
