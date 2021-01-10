require('dotenv').config();
process.on('uncaughtException', err => console.error(err, err.stack));
process.on('unhandledRejection', err => console.error(err, err.stack));
const express = require('express');
const bodyParser = require('body-parser');
const rpc_methods = require('./src/methods');
const app = express();
const conf = require('./src/conf');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', rpc_methods);

const port=conf.port;
server = app.listen(port, () => console.log(`Server running on port ${port}`));