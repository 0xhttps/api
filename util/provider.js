import { WsProvider, ApiPromise } from "@polkadot/api";


//this function must be imported and called to interact with Polkadot API
export default async function initProvider() {
    const provider = new WsProvider('wss://rpc.polkadot.io'); //set RPC
    const api = await ApiPromise.create({ provider }); //create api provider

    return api;
}