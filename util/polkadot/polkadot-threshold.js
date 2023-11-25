import initProvider from "./provider.js";
const bn = 0.00000000010;

export default async function getMinBond() {
    let api = await initProvider();
    let minimumDotBond = await api.query.staking.minimumActiveStake() * bn;
    return minimumDotBond;
}