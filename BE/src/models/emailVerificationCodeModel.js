const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

// OTP model để xác minh email
const emailVerificationCodeModel = sequelize.define(
  "email_verification_codes",
  {
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    code_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    used_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "email_verification_codes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        fields: ["email"],
      },
      {
        fields: ["expires_at"],
      },
    ],
  }
);

module.exports = emailVerificationCodeModel;

