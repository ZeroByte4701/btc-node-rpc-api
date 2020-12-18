const express = require('express');
const router = express.Router();
const Client = require('bitcoin-core');
const conf = require('./conf');
const bitcoin_conf = {
    network: conf.net,
    username: conf.rpc_user,
    password: conf.rpc_pwd
}
const client = new Client();
router.post('getblockcount', (req, res) => {
    client.getBlockchainInformation().then((help) => {
        res.json(help);
    }).catch(err => {
        throw err;
    })
});

module.exports = router;