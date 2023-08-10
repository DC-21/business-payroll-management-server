const Sequelize = require('sequelize');

const sequelize = new Sequelize('payroll','Cholah','Cholah@2104',{
    host:'localhost',
    port:'3306',
    dialect:'mysql',
    logging:console.log,
});
module.exports=sequelize;