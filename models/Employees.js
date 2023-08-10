const sequelize = require('../utils/db');
const { DataTypes } = require("sequelize");

const Departments = sequelize.define("Employees",{
    id:{
        type:DataTypes.STRING,
        unique: true,
        autoIncrement: true,
        allowNull: false,
    },
    Department:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Number_of_employees:{
        type:DataTypes.STRING,
        allowNull:false,
    },
})

module.exports = Departments