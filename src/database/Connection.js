const {Sequelize} = require ('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.Name, process.env.PASSWORD,{
    host: process.env.HOST,
    dialect: process.env.DIALECT
});

module.exports = sequelize;
