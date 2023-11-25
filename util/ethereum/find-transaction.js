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
        if(key) {
            for(let i = 0; i < supportedNetworks.length && !txFound; i++) {
                let response = await fetch(`https://api.unmarshal.com/v1/${supportedNetworks[i]}/transactions/${hash}?auth_key=${key}`);
                let data = await response.json();
                networksSearched++;
                if(data.description) {
                    txFound = true
                    transactionInfo["status"] = 200;
                    transactionInfo["network"] = supportedNetworks[i];
                    transactionInfo["summary"] = data["description"];
                    break
                } else if(data.message == "invalid request") {
                    transactionInfo["status"] = 418;
                    transactionInfo["message"] = "invalid hash"
                    break
                }
            }
        } else {
            transactionInfo["status"] = 418;
            transactionInfo["message"] = "no api key found"
        }
    } catch(err) {
        console.log(err)
    }
    return transactionInfo;
}

