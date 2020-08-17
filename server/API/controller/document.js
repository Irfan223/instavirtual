const config = require('../config/mysqlConfig.js');
const connection = config.connection;
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');
const multer = require('multer');



// -------------------------------------------------------------------------

// ------------------------Get API------------------------------------------
module.exports.getClient = function (req, res, next) {
   var sql;
   var email = req.params.email;
   if(email === undefined || null) {
      sql = "SELECT clientName, clientEmail, clientMobile FROM virtualOfficeClient";
   } else {
	  sql = "SELECT documentName, documentKey, documentUrl, DATE_FORMAT(created_on,'%D %M %Y') AS created_on FROM  documents WHERE clientEmail = ? ORDER BY created_on DESC";
   }
	connection.query(sql, email, function (err, results) {
		if (err) {
			throw err;
		} else {
			res.json(results);
		}
	})
}
//--------------------------End Get API
module.exports.uploadFiles = function (req, res, next) {
	// const {clientName, clientEmail, clientNumber} = req.body;
	var s3 = new aws.S3({
		accessKeyId: "AKIA3OF4JDBAV44J6X6K",
		secretAccessKey: "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",
		bucket: "instavirtualoffice",
	});

	const upload = multer({
		storage: multerS3({
			s3: s3,
			bucket: 'instavirtualoffice',
			acl: 'public-read',
			contentType: multerS3.AUTO_CONTENT_TYPE,
			key: function (req, file, cb) {
				cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
			}
		}),
		limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
		fileFilter: function (req, file, cb) {
			checkFileType(file, cb);
		}
	}).array('files');
	function checkFileType(file, cb) {
		// Allowed ext
		const filetypes = /jpeg|jpg|png|gif|pdf/;
		// Check ext
		const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
		// Check mime
		const mimetype = filetypes.test(file.mimetype);
		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb('Error: Images Only!');
		}
	}
	upload(req, res, (error) => {
		if (error) {
			console.log('errors', error);
			res.json({ error: error });
		} else {
			// If File not found
			const userData = JSON.parse(req.body.userData);
			console.log(userData)
			if (req.files === undefined) {
				console.log('Error: No File Selected!');
				res.json('Error: No File Selected');
			} else {
				// If Success
				var sql = "INSERT INTO virtualOfficeClient (clientName, clientEmail, clientMobile) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE  clientMobile = VALUES(clientMobile)";
				connection.query(sql, [userData.clientName, userData.clientEmail, userData.clientMobile], function (err, result) {
					if (err) throw err;
					console.log("1 record inserted");
					// delete image from s3 bucket storage----
					let fileArray = req.files;
								const galleryImgLocationArray = []; // for storing in database
								const responsedata = [];
								for (let i = 0; i < fileArray.length; i++) {
									galleryImgLocationArray.push([userData.clientEmail, fileArray[i].originalname, fileArray[i].key, fileArray[i].location]);
									responsedata.push({ title: fileArray[i].originalname, url: fileArray[i].location });
								}
								var imageSql = "INSERT INTO documents (clientEmail, documentName,documentKey, documentUrl) VALUES ?"; // upload image query in table 
								connection.query(imageSql, [galleryImgLocationArray], function (err, result) {
									if (err) throw err;
									console.log("Documents array inserted in database");
									res.json({
										status: 200,
										locationArray: responsedata
									});
								});
					// end s3 bucket delete----
				});
			}
		}
	});
}

module.exports.deleteImage = function (req, res, next) {
	const key = req.params.documentKey;
	
	var s3 = new aws.S3({
		accessKeyId: "AKIA3OF4JDBAV44J6X6K",
		secretAccessKey: "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",
		bucket: "instavirtualoffice",
	});
	s3.deleteObject({
		Bucket: 'instavirtualoffice',
		Key: key
	  },function (err,data){
		  if(err) {
			  throw err;
		  } else {
			  // delete image from database
			   let sql = "DELETE FROM documents WHERE documentKey = ?";
			   connection.query(sql, key, function (err, result) {
				   if(err) {
					   throw err;
				   } else {
					   res.json({status: 200, message: 'Successfully image deleted'});
				   }
			   })
			  //--------------------------
		  }
	  });
	  // ----------------------
}