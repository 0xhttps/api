import initProvider from "./provider.js";
import getMinBond from "./polkadot-threshold.js";
const bn = 0.00000000010;

function formatNumber(number) {
    return Number(number).toFixed(3);
}

export default async function getStakeInfo(addr) {
    let api = await initProvider();
    var stakeInfo = {};
    let info = 0;
    await checkBalance();
    async function checkBalance() {
        let minBondForRewards = await getMinBond()
        try {
            const { nonce, data: balance } = await api.query.system.account(addr);
            if (balance.free > 0) {
                stakeInfo["hasBalance"] = true;
                stakeInfo["totalBalance"] = formatNumber(balance.free * bn);
                if (balance.frozen > 0) {
                    stakeInfo["isAccountStaking"] = true;
                    stakeInfo["stakedBalance"] = formatNumber(balance.frozen * bn);
                    stakeInfo["unstakedBalance"] = formatNumber(balance.free * bn - balance.frozen * bn);
                    if (stakeInfo["stakedBalance"] < minBondForRewards) {
                        stakeInfo[`info(${info += 1})`] = `It is suggested to have the staking threshold (${formatNumber(minBondForRewards)}) + 20 to earn rewards`;
                        stakeInfo[`info(${info += 1})`] = `Try staking at least ${formatNumber((minBondForRewards + 20) - stakeInfo["stakedBalance"])} more DOT to earn rewards`;
                        stakeInfo["bondTooLow"] = true;
                    }
                } else {
                    stakeInfo["isStaking"] = false;
                    stakeInfo[`info(${info += 1})`] = `Account not staking`;
                }
            } else {
                stakeInfo["hasBalance"] = false;
                stakeInfo[`info(${info += 1})`] = `Account has no balance`;
            }
        } catch (err) {
            console.error(err);
        }
    }
    return stakeInfo;
}