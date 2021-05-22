var loginCtlr = require('../app/controllers/loginCtlr');

module.exports = function (app) {
    app.post('/profile/userExist', loginCtlr.userExist);
    app.post('/profile/changePassword', loginCtlr.changePassword);
}