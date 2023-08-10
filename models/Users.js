const sequelize = require("../utils/db");
const { DataTypes } = require("sequelize");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
    ,
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    timestamps: false,
  }
);

module.exports = Users;
