const express = require('express');
const url = require('url');
const app = express();
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 8000;
const routes = require('./API/routes/index');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use("/api", routes, function(req, res, next) {
    res.json('Wolcome to Node Js');
});
app.listen(port, () => {
    console.log('listening on port 8000');
})