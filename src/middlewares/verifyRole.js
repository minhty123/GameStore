const User = require("../app/models/User");
const ROLE_LIST = require("../app/models/Role_list");

const verifyRole = (allowedRole) => {
  return (req, res, next) => {
    User.findOne({ name: req.user.name })
      .then((user) => {
        if (user === null || user.IsAdmin !== allowedRole) {
          return res.sendStatus(403); // Người dùng không tồn tại hoặc không có quyền truy cập, từ chối truy cập
        }
        next();
      })
      .catch((error) => {
        console.error("Error:", error);
        res.sendStatus(500);
      });
  };
};

module.exports = verifyRole;
