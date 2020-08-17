const express = require("express");
const router = express.Router();

const Document = require('../controller/document');
const Login = require('../controller/login');
const Download = require('../controller/download');
router.route('/login').post(Login.login);
router.route('/document').post(Document.uploadFiles);
router.route('/document/:documentKey').delete(Document.deleteImage);
router.route('/document').get(Document.getClient);
router.route('/document/:email').get(Document.getClient);
router.route('/download/:filename').post(Download.download);
module.exports = router;