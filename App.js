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

const callback = (err, res) =>
{
    if (err)
        return;

    if (res.more !== "")
        api.getScheduledTransactions( { json: false, lower_bound: res.more }, callback );

    res.transactions.forEach(
        async (tx) => {
            tx = await
                    eos.deserializeTransactionWithActions(
                        Serialize.hexToUint8Array(tx.transaction));

            tx = JSON.stringify(tx);

            fs.appendFile(
                'transactions.txt',
                tx + "\n",
                (err,data) => { if (err) { console.log(err); } }
            );
        }
    );
}

api.getScheduledTransactions( { }, callback );

