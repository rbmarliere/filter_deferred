require('babel-register')({
    presets: [ 'env' ]
})

import EosApi from "eosjs-api";
import fs from "fs";
import { Api, JsonRpc, RpcError, JsSignatureProvider, Serialize } from "eosjs";
import fetch from "node-fetch";
import { TextEncoder, TextDecoder } from "util";

const options = { httpEndpoint: "https://api.eossweden.se", }
const api = EosApi(options);

const rpc = new JsonRpc("https://api.eossweden.se", { fetch });
const signatureProvider = new JsSignatureProvider(["5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"]);
const enc = new TextEncoder();
const dec = new TextDecoder();
const eos = new Api({ rpc, signatureProvider, textEncoder: enc, textDecoder: dec });

//const deser_sched_callback = (err, res) =>
//{
//    if (err)
//        return;
//
//    if (res.more !== "")
//        api.getScheduledTransactions( { json: false, lower_bound: res.more }, callback );
//
//    res.transactions.forEach(
//        async (tx) => {
//            tx = await
//                    eos.deserializeTransactionWithActions(
//                        Serialize.hexToUint8Array(tx.transaction));
//
//            tx = JSON.stringify(tx);
//
//            fs.appendFile(
//                'transactions.txt',
//                tx + "\n",
//                (err,data) => { if (err) { console.log(err); } }
//            );
//        }
//    );
//}

//api.getScheduledTransactions( { }, deser_sched_callback );

const get_transaction =
    async txid => {
        console.log(txid);
        api.getTransaction(txid).then(
            async tx => {
                console.log(JSON.stringify(tx, null, 2));
            });
    };

const deserialize_tx =
    async hex => {
        var res = await
            eos.deserializeTransactionWithActions(
                Serialize.hexToUint8Array(hex));
        console.log(JSON.stringify(res, null, 2));
    };

const args = process.argv.slice(2);
switch ( args[0] ) {
    case "get":
        if ( args[1] === undefined ) {
            console.log("usage: node main.js get <tx_id>");
            break;
        }
        get_transaction( args[1] );
        break;
    case "hex2json":
        if ( args[1] === undefined ) {
            console.log("usage: node main.js hex2json <tx_hex>");
            break;
        }
        deserialize_tx( args[1] );
        break;
    default:
        console.log("usage: node main.js <func> <arg?...>");
}

