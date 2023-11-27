Welcome! This Express.js-based API provides endpoints to retrieve various information related to Polkadot accounts and staking. 
EVM / UTXO based transaction info TBA.

[![API](https://img.shields.io/badge/Visit%20the%20API-blue)](https://api-test-dot.vercel.app/)

## Getting Started

To set up the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/0xhttps/api.git
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the server:**
    ```bash
    npm start
    ```

The server will be running at `http://localhost:4442` by default, but you can customize the port by setting the `PORT` environment variable.

## API Endpoints

### 1. Heartbeat Endpoint

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Check if the API is running.
- **Response:**
    ```json
    {
      "message": "✅"
    }
    ```

### 2. Get Polkadot Minimum Bond

- **Endpoint:** `/api/polkadot/minbond`
- **Method:** `GET`
- **Description:** Retrieve the minimum bond threshold for Polkadot.
- **Response:**
    ```json
    {
      "threshold": <minimumDotBond>,
      "suggested bond": <minimumDotBond + 20>
    }
    ```

### 3. Get Polkadot Account Balances

- **Endpoint:** `/api/polkadot/stake/:addr`
- **Method:** `GET`
- **Description:** Retrieve stake information for a Polkadot account.
- **Parameters:**
  - `addr` (string): Polkadot address
- **Response:**
    ```json
    {
      "stakeInfo": { ... }
    }
    ```
- **hasBalance** (boolean): Indicates whether the account has a positive balance.
- **totalBalance** (string): Formatted total balance of the account.
- **isAccountStaking** (boolean): Indicates whether the account is staking.
- **stakedBalance** (string): Formatted staked balance.
- **unstakedBalance** (string): Formatted unstaked balance.
- **bondTooLow** (boolean): Indicates if the staked balance is below the minimum required for rewards.
- **info(n)** (string): Additional information messages. `n` is a sequential number starting from 1.

### 4. Get Polkadot Account Validator Info

- **Endpoint:** `/api/polkadot/validator/:addr`
- **Method:** `GET`
- **Description:** Retrieve validator information for a Polkadot account.
- **Parameters:**
  - `addr` (string): Polkadot address
- **Response:**
    ```json
    {
      "validatorInfo": { ... }
    }
    ```
- **address** (string): The address of the nominated validator.
- **commission** (string): The commission rate of the nominated validator, formatted as a percentage.
- **allMaxCommisision** (boolean): Indicates whether all nominated validators have a maximum commission of 100%.
- **maxNominations**(boolean): Indicates whether the number of nominations is less than 16.
- **info(n)** (string):Additional information messages with sequential numbers starting from 1, providing insights into commission rates and nominations.

### 5. Get All Polkadot Staking Info

- **Endpoint:** `/api/polkadot/allstakinginfo/:addr`
- **Method:** `GET`
- **Description:** Retrieve both stake and validator information for a Polkadot account.
- **Parameters:**
  - `addr` (string): Polkadot address
- **Response:**
    ```json
    {
      "stakeInfo": { ... },
      "validatorInfo": { ... }
    }
    ```

### 6. Get EVM Transaction Info

- **Endpoint:** `/api/evm/tranasctionInfo/:hash`
- **Method:** `GET`
- **Description:** Retrieve the network that the transaction took place on, along with a short summary.
- **Parameters:**
  - `hash` (string): EVM transaction hash
- **Networks:** [ethereum, bsc, matic(polygon), arbitrum, avalanche, cronos, optimism, base, zkevm, xinfin]
- **Response:**
    ```json
    {
      "tranasctionInfo": {
        "status": ...,
         ... }
    }
    ```
- **status** (num): The status of the API call. This can be either 200 (success), or 418 (error) currently.
- **network** (string): The network that the tranasction took place on.
- **summary** (string): Information about the transaction.

### 7. Get Ethereum Account Balance
- **Endpoint:** `/api/ethereum/accountbalance/:addr`
- **Method:** `GET`
- **Description:** Retrieve the balance of an Ethereum account.
- **Parameters:**
  - `addr` (string): Ethereum account address
- **Networks:** [ethereum]
- **Response:**
    ```json
    {
      "accountBalance": { ... }
    }
    ```
- **status** (num): The status of the API call. This can be either 200 (success), or 418 (error) currently.
- **balance** (string): The Ethereum balance of the Ethereum account.
