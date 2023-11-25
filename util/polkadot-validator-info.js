import initProvider from "./provider.js";
const bn = 0.00000000010;
const commissionMath = 0.00000010;

function formatNumber(number) {
    return Number(number).toFixed(3);
}

export default async function getValidatorInfo(addr) {
    let api = await initProvider();
    let numOfHighCommission = 0;
    let allMaxCommission = false;
    let someMaxCommission = false;
    let isHighCommission = false;
    let maxNoms = true;
    let info = 0
    var validatorInfo = {};


    try {
        const nominators = JSON.parse(await api.query.staking.nominators(addr));
        for (let i = 0; i < nominators.targets.length; i++) {
            let commission = JSON.parse(await api.query.staking.validators(nominators.targets[i]));
            validatorInfo[i] = {
                "address": (nominators.targets[i]),
                "commission": (`${formatNumber(commission.commission * commissionMath)}%`),
            }
            if (formatNumber(commission.commission * commissionMath) == 100) {
                numOfHighCommission++
                isHighCommission = true
            }
        }
        if (numOfHighCommission == nominators.targets.length && !allMaxCommission) {
            if (isHighCommission) {
                allMaxCommission = true;
                validatorInfo["allMaxCommission"] = true
                validatorInfo[`info(${info += 1})`] = `All (${numOfHighCommission}) validator(s) nominated have 100% commision`;
            }
        }
        if (numOfHighCommission < nominators.targets.length && isHighCommission && !allMaxCommission) {
            someMaxCommission = true;
            validatorInfo[`info(${info += 1})`] = `Some (${numOfHighCommission}) validator(s) nominated have 100% commision`;
        }
        if (nominators.targets.length < 16) {
            validatorInfo["maxNominations"] = false;
            validatorInfo[`info(${info += 1})`] = `Nominate 16 validators for best chance at earning consistent rewards`;
            validatorInfo[`info(${info += 1})`] = `${nominators.targets.length} validator(s) currently nominated`;
        }
        if (someMaxCommission) {
            validatorInfo[`info(${info += 1})`] = `May or may not earn rewards consistently due to current validators nominated (commission issue)`;
        }
        else if (!allMaxCommission && !someMaxCommission && maxNoms == true) {
            validatorInfo[`info(${info += 1})`] = `You should be earning rewards`;
        }
    } catch (err) {
        console.error(err);
    }
    return validatorInfo;
}

