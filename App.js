import EosApi from "eosjs-api";
import Serializer from "./Serializer";
import fs from "fs";

const options = { httpEndpoint: "https://api.eossweden.se", }
const api = EosApi(options);

const callback = (err, res) =>
{
    if (err)
        return;

    if (res.more !== "")
        api.getScheduledTransactions( { json: false, lower_bound: res.more }, callback );

    res.transactions.forEach(
        (tx) => {
            tx = Serializer.deserializeTransaction(tx.transaction);
            fs.appendFile(
                'transactions.txt',
                "\n" + JSON.stringify(tx),
                (err,data) => { if (err) { console.log(err); } }
            );
        }
    );
}

api.getScheduledTransactions( { }, callback );

