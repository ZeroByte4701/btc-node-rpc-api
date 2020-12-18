const express = require('express');
const router = express.Router();
const request = require('request');
const Client = require('bitcoin-core');
const conf = require('./conf');
const axios = require('axios');
const bitcoin_conf = {
    network: conf.rpc_net,
    username: conf.rpc_user,
    password: conf.rpc_pwd,
    port: conf.rpc_port,
    wallet: 'wallet.dat'
}
console.log(bitcoin_conf)
const client = new Client(bitcoin_conf);
router.get('/test', (req, res) => {
    console.log('backend works well!');
});
router.post('/getblockcount', (req, res) => {
    console.log(client.getBlockchainInformation());
});

router.post('/getblockchaininfo', (req, res) => {
    const headers = {
        'content-type':'text/plain'
    };
    const url = `http://${conf.rpc_user}:${conf.rpc_pwd}@${conf.rpc_url}:${conf.rpc_port}`;
    const body = JSON.stringify({jsonrpc:'1.0', id: 'curltext', method: 'getblockchaininfo', params: []});
    axios.post(url, body, headers)
        .then(value => {
            console.log(value);
        })
        .catch(err => {
            console.error(err);
        })
})

module.exports = router;