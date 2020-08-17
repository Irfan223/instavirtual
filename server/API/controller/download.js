const path = require('path');
module.exports.download = function(res, res, next) {

filepath = path.join(__dirname, '') + '/'+ req.body.filename;
res.sendFile(filepath);
}