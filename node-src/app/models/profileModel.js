var Sequelize = require('sequelize');
var database = require('../../config/database.js');
var cmnMstrModel = database.define('userprofile', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullname: {
        type: Sequelize.STRING,
    },
    emailid: {
        type: Sequelize.STRING,
    },
    mobileno: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },
    createddate: {
        type: Sequelize.STRING,
    },
    updateddate: {
        type: Sequelize.STRING,
    },
}, {    
    timestamps: false,
    freezeTableName: true
});

module.exports = cmnMstrModel;