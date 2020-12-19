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
const headers = {
    'Content-Type': 'text/plain'
};
console.log(bitcoin_conf)
const client = new Client(bitcoin_conf);
router.get('/test', (req, res) => {
    console.log('backend works well!');
});
router.post('/getblockcount', (req, res) => {
    console.log(client.getBlockchainInformation());
});

router.post('/getblockchaininfo', (req, res) => {
    const url = `http://${conf.rpc_user}:${conf.rpc_pwd}@${conf.rpc_url}:${conf.rpc_port}`;
    const body = JSON.stringify({jsonrpc:'1.0', id: 'curltext', method: 'getblockchaininfo', params: []});
    axios.post(url, body, headers)
        .then(result => {
            console.log(result.data);
            res.json(result.data);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        })
});

router.post('/getblockhash', (req, res) => {
    var url = `http://${conf.rpc_user}:${conf.rpc_pwd}@${conf.rpc_url}:${conf.rpc_port}`;
    var body = JSON.stringify({jsonrpc:'1.0', id: 'curltext', method: 'getblockhash', params: [parseInt(req.body.blocknumber)]});
    axios.post(url, body, headers)
        .then(result => {
            console.log(result.data);
            res.json(result.data);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        })
});

module.exports = router;