import { BigNumber, ethers } from "ethers";
import { config } from 'dotenv';
config();

const key = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;
let accountBalance = {};

export default async function getAccountBalance(addr) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(key);
        const balance = ethers.utils.formatEther(BigNumber.from(await provider.getBalance(addr))).slice(0,7);
        accountBalance["status"] = 200;
        accountBalance["balance"] = balance;
    } catch(err) {
        console.log(err)
    }
    return accountBalance;
}