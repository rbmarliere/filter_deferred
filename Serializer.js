import { Api, JsonRpc, RpcError, JsSignatureProvider } from "eosjs";
import { TextEncoder, TextDecoder } from "util";

const rpc = new JsonRpc("", { fetch });
const signatureProvider = new JsSignatureProvider(["5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"]);
const enc = new TextEncoder();
const dec = new TextDecoder();

const Serializer = new Api({ rpc, signatureProvider, textEncoder: enc, textDecoder: dec });

export default Serializer;

