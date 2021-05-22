const Sequelize = require('sequelize');

let dbhost, dbname, dbuser, dbpass = '';
dbhost = 'dbhost';  
dbname = 'dbname';    
dbuser = 'dbuser';
dbpass = 'dbpass';

const sequelize = new Sequelize(dbname, dbuser, dbpass, {
  host: dbhost,
  port: 3306,
  dialect: 'mysql'
});

module.exports = sequelize;