const sequelize = require("../utils/db");
const { DataTypes, DECIMAL } = require("sequelize");

const CompanyFinance = sequelize.define(
  "CompanyFinance",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Month: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = CompanyFinance;
