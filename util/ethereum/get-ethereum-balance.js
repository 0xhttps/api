import { BigNumber, ethers } from "ethers";
import { config } from 'dotenv';
config();

const key = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;

async function getBalance(addr) {
    const provider = new ethers.providers.JsonRpcProvider(key);
    const balance = ethers.utils.formatEther(BigNumber.from(await provider.getBalance(addr))).slice(0,7);
    console.log(balance)
}

getBalance("0xb629CAfAE80450B460A1eB5441D588ce35360597");