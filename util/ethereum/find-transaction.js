import { config } from 'dotenv';
config();

let key = process.env.UM_API_KEY

const supportedNetworks = [
    "ethereum", "bsc", "matic", "arbitrum", 
    "avalanche", "cronos", "optimism", "base", 
    "zkevm", "xinfin"
]

export default async function getTransactionInfo(hash) {
    let txFound = false
    let networksSearched = 0;
    var transactionInfo = {};
    try { 
        for(let i = 0; i < supportedNetworks.length && !txFound; i++) {
            let response = await fetch(`https://api.unmarshal.com/v1/${supportedNetworks[i]}/transactions/${hash}?auth_key=${key}`);
            let data = await response.json();
            networksSearched++;
            if(data.description) {
                txFound = true
                transactionInfo["network"] = supportedNetworks[i];
                transactionInfo["summary"] = data["description"];
                break
            } else if(data.message == "invalid request") {
                transactionInfo["error"] = "invalid hash / not found"
                break
            }
        }
    } catch(err) {
        console.log(err)
    }
    return transactionInfo;
}

