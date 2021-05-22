const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const DB = require('../../config/database');
const profileModel = require('./profileModel.js');

exports.userExist = async params => {
    try {
        let checkData = await profileModel.findAll({ where: params });
        return { "success": true, "response": checkData };
    } catch (error) {
        return { "success": false, "response": error };
    }
}

exports.checkPassword = async (params, where) => {
    try {
        let saveResponse = await profileModel.findAll({ where: params });
        return { "success": true, "response": saveResponse };
    } catch (error) {
        return { "success": false, "response": error };
    }
}

exports.updatePassword = async (params, where) => {
    try {
        let saveResponse = await profileModel.update(params, { where: where });
        return { "success": true, "response": saveResponse };
    } catch (error) {
        return { "success": false, "response": error };
    }
}