const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ReviewMediaModel = sequelize.define(
  "review_media",
  {
    review_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    media_type: {
      type: DataTypes.ENUM("image", "video"),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    sort_order: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "review_media",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        name: "idx_review",
        fields: ["review_id"],
      },
    ],
  },
);
module.exports = ReviewMediaModel;
