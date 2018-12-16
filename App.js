import EosApi from "eosjs-api";

const options = { httpEndpoint: "https://api.eossweden.se", }
const api = EosApi(options);

api.getScheduledTransactions({}).then(
    (result) => {
        console.log(result);
    }
);

