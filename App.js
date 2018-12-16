import EosApi from "eosjs-api";
import Serializer from "./Serializer";

const options = { httpEndpoint: "https://api.eossweden.se", }
const api = EosApi(options);

api.getScheduledTransactions({}).then(
    async (result) => {
        const tx = await Serializer.deserializeTransaction(result.transactions[0].transaction);
        console.log(tx);
    }
);

