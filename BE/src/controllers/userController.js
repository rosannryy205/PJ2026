const { getAllUsers } = require("../services/userService");

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers: getAllUsersController };

