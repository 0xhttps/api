import Express from 'express';
import cors from 'cors';
import getMinBond from './util/polkadot/polkadot-threshold.js';
import getStakeInfo from './util/polkadot/polkadot-account-info.js';
import getValidatorInfo from './util/polkadot/polkadot-validator-info.js';
import isValidSubstrateAddress from './util/polkadot/check-address.js';
import getTransactionInfo from './util/ethereum/find-transaction.js';
import getAccountBalance from './util/ethereum/get-ethereum-balance.js'

const app = Express()
const PORT = process.env.PORT || 4442;

app.use(Express.json());
app.use(cors());

app.listen(
    PORT,
    () => console.log(`listening`)
);

app.get('/', (req, res) => {
    res.json({
      message: '✅',
    });
  });

//get polkadot minimum bond*
app.get('/api/polkadot/minbond', async (req, res) => {
    let minimumDotBond = await getMinBond()
    if(minimumDotBond) {
        res.status(200).send({
        threshold: minimumDotBond,
        "suggested bond": minimumDotBond + 20
        })
        console.log(`Returned GET req minbond`);
    }
});

//get polkadot account balances*
app.get('/api/polkadot/stake/:addr', async (req, res) => {
    const { addr } = req.params;
    try {
        let isValid = await isValidSubstrateAddress(addr)
        if(!isValid) {
            res.status(418).send({message: 'invalid valid Polkadot address'})
        } else {
            let stakeInfo = await getStakeInfo(addr);
            res.send({ stakeInfo })
        }
    } catch(err) {
        res.send({err})
    }
});

//get polkadot account validator info*
app.get('/api/polkadot/validator/:addr', async (req, res) => {
    const { addr } = req.params;
    try {
        let isValid = await isValidSubstrateAddress(addr)
        if(!isValid) {
            res.status(418).send({message: 'invalid Polkadot address'})
        } else {
            let validatorInfo = await getValidatorInfo(addr);
            res.send({ validatorInfo })
        }
    } catch(err) {
        res.send({err})
    }
})

//get all
app.get('/api/polkadot/allstakinginfo/:addr', async (req, res) => {
    const { addr } = req.params;
    try {
        let isValid = await isValidSubstrateAddress(addr)
        if(!isValid) {
            res.status(418).send({message: 'invalid Polkadot address'})
        } else {
            let stakeInfo = await getStakeInfo(addr);
            let validatorInfo = await getValidatorInfo(addr);
            res.send({ stakeInfo, validatorInfo })
        }
    } catch(err) {
        res.send({err})
    }
})

app.get('/api/evm/tranasctionInfo/:hash', async (req, res) => {
    const { hash } = req.params;
    try {
        let tranasctionInfo = await getTransactionInfo(hash)
        res.status(tranasctionInfo["status"]).send({ tranasctionInfo })
    } catch(err) {
        res.send({err})
    }
})

app.get('/api/ethereum/accountbalance/:addr', async (req, res) => {
    const { addr } = req.params;
    try {
        if(addr.startsWith("0x") && addr.length === 42) {
            let accountBalance = await getAccountBalance(addr)
            res.status(accountBalance["status"]).send({ accountBalance })
        } else {
            res.status(418).send({message: 'invalid ethereum address'})
        }
    } catch(err) {
        res.send({err})
    }
})