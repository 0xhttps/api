import { WsProvider, ApiPromise } from "@polkadot/api";

export default async function initProvider() {
    const provider = new WsProvider('wss://rpc.polkadot.io'); //set RPC
    const api = await ApiPromise.create({ provider }); //create api provider
    return api;
}