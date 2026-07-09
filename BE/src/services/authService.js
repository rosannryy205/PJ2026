const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const buildJwt = ({ userId }) => {
  // JWT đặt trong cookie httpOnly nên client không đọc được token.
  const secret = process.env.JWT_SECRET || "dev_secret_change_me";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign({ userId }, secret, { expiresIn });
};

/**
 * loginService
 * - Validate email/password
 * - Sign JWT
 */
const loginService = async ({ email, password }) => {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const rawPassword = typeof password === "string" ? password : "";

  if (!normalizedEmail || !rawPassword) {
    const err = new Error("Email and password are required");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({
    where: { email: normalizedEmail },
    attributes: ["id", "name", "email", "avatar", "role", "password"],
  });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(rawPassword, user.password);
  if (!ok) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const token = buildJwt({ userId: user.id });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    },
  };
};

/**
 * meService
 * - Lấy user theo id từ req.user
 */
const meService = async ({ userId }) => {
  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email", "avatar", "role"],
  });

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
  };
};

module.exports = {
  loginService,
  meService,
};

