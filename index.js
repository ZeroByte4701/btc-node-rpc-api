require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const rpc_methods = require('./src/methods');
const app = express();
const conf = require('./src/conf');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', rpc_methods);

const port=conf.port;
server = app.listen(port, () => console.log(`Server running on port ${port}`));