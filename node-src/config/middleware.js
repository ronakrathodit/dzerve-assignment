const middleWare = function (req, res, next) {
    // Start
    if (req.cookies.uuid === undefined || req.cookies.uuid == "") {
        res.json({ "success": false, "response": { "api_name": "", "data": { "url": "" }, "msg": "signout" } });
    }
    next();
}
module.exports = middleWare;