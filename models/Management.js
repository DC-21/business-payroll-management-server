const sequelize = require('../utils/db');
const { DataTypes} = require('sequelize');

const Management = sequelize.define("Management",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    position:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    phone:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
    ,
    nrc:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    salary:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
},{
    timestamps:false,
});

module.exports= Management;