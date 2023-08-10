const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");

const Data = sequelize.define(
  "Data",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sourceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sourceContent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    extractedText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Data;
