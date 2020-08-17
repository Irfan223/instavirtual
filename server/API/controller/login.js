const config = require('../config/mysqlConfig.js');
const connection = config.connection;
module.exports.login = function (req, res, next) {
//    console.log(req)
    var sql = "SELECT userId, name, username FROM login WHERE username = ? AND password = ?";
    connection.query(sql, [req.body.email, req.body.password], function (err, result) {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                res.json({status: 200,message: 'Successfully logged in', data: result})
            } else {
                res.json({status: 500,message: 'Wrong credential, please enter correct credential'});
            }
        }
    })
    // console.log(req);

}