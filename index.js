const express = require('express');
const bodyParser = require('body-parser');
const rpc_methods = require('./src/methods');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', rpc_methods);

const port=process.env.PORT;
server = app.listen(port, () => console.log(`Server running on port ${port}`));