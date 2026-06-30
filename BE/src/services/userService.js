const User = require("../models/userModel");

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] }, // loại bỏ password khỏi kết quả trả về
  });

  return users;
};

module.exports = {
  getAllUsers,
};

