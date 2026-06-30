const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const CategoryModel = sequelize.define(
  "categories",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

module.exports = CategoryModel;