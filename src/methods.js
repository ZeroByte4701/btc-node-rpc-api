const express = require('express');
const router = express.Router();
const Client = require('bitcoin-core');
const conf = require('./conf');
const bitcoin_conf = {
    network: conf.rpc_net,
    username: conf.rpc_user,
    password: conf.rpc_pwd,
    port: conf.rpc_port
}
console.log(bitcoin_conf)
const client = new Client(bitcoin_conf);
router.get('/test', (req, res) => {
    console.log('backend works well!');
});
router.post('/getblockcount', (req, res) => {
    console.log(client.getBlockchainInformation());
});

module.exports = router;