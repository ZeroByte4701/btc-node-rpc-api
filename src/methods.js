const express = require('express');
const router = express.Router();
const request = require('request');
const conf = require('./conf');
const axios = require('axios');
var core_host = `http://${conf.rpc_user}:${conf.rpc_pwd}@${conf.rpc_url}:${conf.rpc_port}`;
var wallet_host = core_host + `/wallet/${conf.wallet_name}`;
const headers = {
    'Content-Type': 'text/plain'
};
router.post('/getblockcount', (req, res) =>{
    var body = JSON.stringify({jsonrpc:'1.0', id: 'curltext', method: 'getblockcount', params: []});
    axios.post(core_host, body, headers)
        .then(result => {
            res.json(result.data);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        })
});
router.post('/getblock', (req, res) =>{
    var body = JSON.stringify({jsonrpc:'1.0', id: 'curltext', method: 'getblock', params: [req.body.blockhash]});
    axios.post(core_host, body, headers)
        .then(result => {
            res.json(result.data);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        })
});
router.post('/getblockchaininfo', (req, res) => {
    var body = JSON.stringify({jsonrpc:'1.0', id: 'curltext', method: 'getblockchaininfo', params: []});
    axios.post(core_host, body, headers)
        .then(result => {
            console.log(result.data);
            res.json(result.data);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        });
});

router.post('/getblockhash', (req, res) => {
    var body = JSON.stringify({jsonrpc:'1.0', id: 'curltext', method: 'getblockhash', params: [req.body.blocknumber]});
    axios.post(core_host, body, headers)
        .then(result => {
            console.log(result.data);
            res.json(result.data);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        });
});

router.post('/getrawtransaction', (req, res) => {
    var body = JSON.stringify({jsonrpc:'1.0', id: 'curltext', method: 'getrawtransaction', params: [req.body.txhash, true]});
    axios.post(core_host, body, headers)
        .then(result => {
            console.log(result.data.vout);
            res.json(result.data.result.vout);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        });
});

router.post('/generate_new_address', (req, res) => {
    var body = JSON.stringify({jsonrpc: "1.0", id: "curltext", method:"getnewaddress", params: ["","p2sh-segwit"]});
    axios.post(wallet_host, body, headers)
        .then(result => {
            body = JSON.stringify({jsonrpc: "1.0", id: "curltext", method:"dumpprivkey", params: [result.data.result]});  
            axios.post(url, body, headers)
                .then(res_privKey => {
                    var res_data = {
                        address: result.data.result,
                        privateKey: res_privKey.data.result
                    };
                    res.json(res_data);
                })
                .catch(err => {
                    console.error(err);
                    res.json(err);
                })
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        })
});

router.post('/getbalances', (req, res) => {
    var body = JSON.stringify({jsonrpc: "1.0", id: "curltext", method:"getbalances", params: []})
    axios.post(wallet_host, body, headers)
        .then(result => {
            console.log(result.data);
            res.json(result.data);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        });
});

router.post('/getbalance', (req, res) => {
    var body = JSON.stringify({jsonrpc: "1.0", id: "curltext", method: "getbalance", params: []});
    axios.post(wallet_host, body, headers)
        .then(result => {
            console.log(result.data);
            res.json(result.data);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        });
});

router.post('/sendtoaddress', (req, res) => {
    var body = JSON.stringify({jsonrpc: "1.0", id: "curltext", method: "sendtoaddress", params: [req.body.address, req.body.amount, " ", "withdrawal"]});
    axios.post(wallet_host, body, headers)
        .then(result => {
            console.log(result.data);
            res.json(result.data);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        });
});

router.post('/getaddressinfo', (req, res) => {
    var body = JSON.stringify({jsonrpc: "1.0", id: "curltext", method: "getaddressinfo", params: [req.body.address]});
    axios.post(wallet_host, body, headers)
        .then(result => {
            console.log(result.data);
            res.json(result.json);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        });
});

router.post('/getwalletinfo', (req, res) => {
    var body = JSON.stringify({jsonrpc: "1.0", id: "curltext", method: "getwalletinfo", params: []});
    axios.post(wallet_host, body, headers)
        .then(result => {
            console.log(result.data);
            res.json(result.data);
        })
        .catch(err => {
            console.error(err);
            res.json(err);
        });
});

module.exports = router;