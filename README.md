# `router-devkit-sdk`



- 🔗 https://www.npmjs.com/package/sushiswap-v1-periphery

- 🔗 https://www.npmjs.com/package/@openmev/sushiswap-router



---

# SushiswapV01 Exchange: SushiGuardV01 Router

> Documentation

## Creating Contract Instances

There will be a hardcoded list of token and exchange addresses (also symbol/name/decimals) for each ERC20 listed on the website. It should be as easy as possible to add support for a new ERC20.

> Below are the addresses for three tokens with exchanges that are live an have been tested on the latest Sushiswap testnet. 

#### Factory Address
0xf5D915570BC477f9B8D6C0E980aA81757A3AaC36


#### Token / Exchange Addresses (Rinkeby) 
**Symbol:** DAI  
**Name:** Dai Stablecoin
**Decimals:** 18
**Token Address:** 0x2448eE2641d78CC42D7AD76498917359D961A783
**DAI Exchange:** 0x77dB9C915809e7BE439D2AB21032B1b8B58F6891

**Symbol:** MKR  
**Name:** Maker
**Decimals:** 18
**Token Address:** 0xF9bA5210F91D0474bd1e1DcDAeC4C58E359AaD85
**Exchange Address:** 0x93bB63aFe1E0180d0eF100D774B473034fd60C36

**Symbol:** ZRX  
**Name:** 0x Protocol Token
**Decimals:** 18
**Token Address:** 0xF22e3F33768354c9805d046af3C0926f27741B43
**Exchange Address:** 0xaBD44a1D1b9Fb0F39fE1D1ee6b1e2a14916D067D

#### Factory ABI
```
[{"name": "NewExchange", "inputs": [{"type": "address", "name": "token", "indexed": true}, {"type": "address", "name": "exchange", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "initializeFactory", "outputs": [], "inputs": [{"type": "address", "name": "template"}], "constant": false, "payable": false, "type": "function", "gas": 35725}, {"name": "createExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": false, "payable": false, "type": "function", "gas": 187911}, {"name": "getExchange", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "token"}], "constant": true, "payable": false, "type": "function", "gas": 715}, {"name": "getToken", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "address", "name": "exchange"}], "constant": true, "payable": false, "type": "function", "gas": 745}, {"name": "getTokenWithId", "outputs": [{"type": "address", "name": "out"}], "inputs": [{"type": "uint256", "name": "token_id"}], "constant": true, "payable": false, "type": "function", "gas": 736}, {"name": "exchangeTemplate", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 633}, {"name": "tokenCount", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 663}]
```

#### Token ABI
```
[{"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "__init__", "outputs": [], "inputs": [{"type": "bytes32", "name": "_name"}, {"type": "bytes32", "name": "_symbol"}, {"type": "uint256", "name": "_decimals"}, {"type": "uint256", "name": "_supply"}], "constant": false, "payable": false, "type": "constructor"}, {"name": "deposit", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function", "gas": 74279}, {"name": "withdraw", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 108706}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 543}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 745}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 74698}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110600}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 37888}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1025}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 723}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 753}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 783}]
```
 

#### Exchange ABI
```
[{"name": "TokenPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "eth_sold", "indexed": true}, {"type": "uint256", "name": "tokens_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "EthPurchase", "inputs": [{"type": "address", "name": "buyer", "indexed": true}, {"type": "uint256", "name": "tokens_sold", "indexed": true}, {"type": "uint256", "name": "eth_bought", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "AddLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "RemoveLiquidity", "inputs": [{"type": "address", "name": "provider", "indexed": true}, {"type": "uint256", "name": "eth_amount", "indexed": true}, {"type": "uint256", "name": "token_amount", "indexed": true}], "anonymous": false, "type": "event"}, {"name": "Transfer", "inputs": [{"type": "address", "name": "_from", "indexed": true}, {"type": "address", "name": "_to", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "Approval", "inputs": [{"type": "address", "name": "_owner", "indexed": true}, {"type": "address", "name": "_spender", "indexed": true}, {"type": "uint256", "name": "_value", "indexed": false}], "anonymous": false, "type": "event"}, {"name": "setup", "outputs": [], "inputs": [{"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 175875}, {"name": "addLiquidity", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_liquidity"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 82605}, {"name": "removeLiquidity", "outputs": [{"type": "uint256", "name": "out"}, {"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "amount"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 116814}, {"name": "__default__", "outputs": [], "inputs": [], "constant": false, "payable": true, "type": "function"}, {"name": "ethToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 12757}, {"name": "ethToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "min_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 12965}, {"name": "ethToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": true, "type": "function", "gas": 50463}, {"name": "ethToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": true, "type": "function", "gas": 50671}, {"name": "tokenToEthSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 47503}, {"name": "tokenToEthTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_eth"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 47712}, {"name": "tokenToEthSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}], "constant": false, "payable": false, "type": "function", "gas": 50175}, {"name": "tokenToEthTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}, {"type": "uint256", "name": "max_tokens"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}], "constant": false, "payable": false, "type": "function", "gas": 50384}, {"name": "tokenToTokenSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51007}, {"name": "tokenToTokenTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 51098}, {"name": "tokenToTokenSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 54928}, {"name": "tokenToTokenTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "token_addr"}], "constant": false, "payable": false, "type": "function", "gas": 55019}, {"name": "tokenToExchangeSwapInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49342}, {"name": "tokenToExchangeTransferInput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}, {"type": "uint256", "name": "min_tokens_bought"}, {"type": "uint256", "name": "min_eth_bought"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 49532}, {"name": "tokenToExchangeSwapOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53233}, {"name": "tokenToExchangeTransferOutput", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}, {"type": "uint256", "name": "max_tokens_sold"}, {"type": "uint256", "name": "max_eth_sold"}, {"type": "uint256", "name": "deadline"}, {"type": "address", "name": "recipient"}, {"type": "address", "name": "exchange_addr"}], "constant": false, "payable": false, "type": "function", "gas": 53423}, {"name": "getEthToTokenInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5542}, {"name": "getEthToTokenOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6872}, {"name": "getTokenToEthInputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "tokens_sold"}], "constant": true, "payable": false, "type": "function", "gas": 5637}, {"name": "getTokenToEthOutputPrice", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "uint256", "name": "eth_bought"}], "constant": true, "payable": false, "type": "function", "gas": 6897}, {"name": "tokenAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1413}, {"name": "factoryAddress", "outputs": [{"type": "address", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1443}, {"name": "balanceOf", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}], "constant": true, "payable": false, "type": "function", "gas": 1645}, {"name": "transfer", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 75034}, {"name": "transferFrom", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_from"}, {"type": "address", "name": "_to"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 110907}, {"name": "approve", "outputs": [{"type": "bool", "name": "out"}], "inputs": [{"type": "address", "name": "_spender"}, {"type": "uint256", "name": "_value"}], "constant": false, "payable": false, "type": "function", "gas": 38769}, {"name": "allowance", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [{"type": "address", "name": "_owner"}, {"type": "address", "name": "_spender"}], "constant": true, "payable": false, "type": "function", "gas": 1925}, {"name": "name", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1623}, {"name": "symbol", "outputs": [{"type": "bytes32", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1653}, {"name": "decimals", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1683}, {"name": "totalSupply", "outputs": [{"type": "uint256", "name": "out"}], "inputs": [], "constant": true, "payable": false, "type": "function", "gas": 1713}]
```
Technically the entire ERC20 ABI is included in the Exchange ABI, so debatably you could use the Exchange ABI for both. I don't know if there are performances issues with that since the Exchange ABI is much longer.

#### Web3 
Create an instance of an ERC20 or exchange contract only requires the address and ABI. 

```javascript
contract = new web3.eth.Contract(ABI, address);
```

ERC20 contracts are used in queries of user balances,  approval states (allowances), and ERC20 balances of exchanges (used in pricing or trading and pooling). They are also used in `approve` transactions that unlock usage of a token as an input on a per-account basis. 

Exchange contracts are used in queries of of a users liquidity balances in the `pool` tab. They are also used in all transactions that `swap`, `send`, `add liquidity`, or `remove liquidity`. The token `name`, `symbol`, and `decimals` can also be queried (and should for arbitrary tokens) but this is unnecessary for tokens in the hardcoded list.  

## Factory

### Get Exchange
There is a separate exchange contract for every ERC20 token. This function is used retreive the exchange address associated with an ERC20 token. 

```javascript
factory = new web3.eth.Contract(factoryABI, factoryAddress)

exchangeAddress = factory.methods.getExchange(tokenAddress)
```

:::info
If `exchangeAddress == 0x0000000000000000000000000000000000000000`  the token does not yet have an exchange. 
:::

### Get Token
This function is used retreive the ERC20 token address associated with a Sushiswap exchange. 

```javascript
factory = new web3.eth.Contract(factoryABI, factoryAddress)

tokenAddress = factory.methods.getToken(exchangeAddress)
```

:::info
If `tokenAddress == 0x0000000000000000000000000000000000000000`  the address is not a Sushiswap exchange. 
:::

### Create Exchange
This function is used to launch an exchange for an ERC20 token that does not yet have an exchange.

```javascript
factory = new web3.eth.Contract(factoryABI, factoryAddress)

factory.methods.createExchange(tokenAddress).send({from: userAddress})
```

## Block Timestamp
The block timestamp is needed for calculating transaction deadlines. It should be updated every tick.

```javascript
web3.eth.getBlock('latest', (error, block) => {
    lastTimestamp = block.timestamp
})
```

## User Balances

### ETH Balance

A users ETH Balance is shown in token selection screen (defaults to ETH), and should be queried immediately, and then every tick (15 seconds) for as long as the user is connected.

```javascript
web3.eth.getBalance(address, (error, result) => {
    ethBalance = result;
});
```

### Token Balances
Because user balances are shown in the token selection of `swap`and`send` and pool token balances are shown in the token selection of `pool`, these contracts should be instantiated and the balances queried as soon as web3 is availible/unlocked and updated every tick. 

#### ERC20 balances
```javascript 
tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

tokenContract.methods.balanceOf(userAddress).call((result, error) => {
    userBalance = result
});
```

#### Pool token balances
```javascript 
// You can also use tokenABI here, since balanceOf is the same for both
exchangeContract = new web3.eth.Contract(exchangeABI, exchangeAddress);

exchangeContract.methods.balanceOf(userAddress).call((result, error) => {
    userPoolBalance = result
});
```

## Exchange Balances (reserves)
Exchange reserves are needed for determining exchange rate and pool size, and should be queried immediately when the ERC20 token traded on that exchange is selected (in both input and output), and updated every tick for as long as its selected.
### ETH Reserves
The ETH reserve associated with an ERC20 token is found by checking the ETH balance of the exchange contract assoicated with that token. 

```javascript
web3.eth.getBalance(exchangeAddress, (error, result) => {
    ethReserve = result;
});
```

### ERC20 Reserves
The ERC20 reserve of an ERC20 token is found by checking the ERC20 balance of the exchange contract assoicated with that token. 

```javascript 
tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);

tokenContract.methods.balanceOf(exchangeAddress).call((result, error) => {
    tokenReserve = result
});
```





##  Allowances and Approval (unlock)
Allowances are needed to determine if a token can be spent on behalf of the user by the exchange contracts. Allowances should be queried on any ERC20 token selected as an **input**. If the allowance of an exchange spending on behalf of a user is 0, then token sold on that exchange should be marked as locked when selected. 

```javascript
// tokenContract is the ERC20 sold on the exchange at exchangeAddress
tokenContract.methods.allowance(userAddress, exchangeAddress).call((result, error) => {
    allowanceAmount = result
});
```

In order to approve or "unlock" an input token, a transaction must be made to the approve function. The amount approved (for now) should be `decimals * 10^8` (remember a decimals value will be hardcoded for each token built into the site). 

```javascript
tokenContract.methods.approve(exchangeAddress, amount).send({from: userAddress})
});
```

Allowance should be queried once on **INPUT** token selection. If token is "locked", it should be checked again every tick until unlocked or deselected. 

## ETH <-> ERC20 Calculations

:::info
**IMPORTANT NOTE:** 

Smart contracts do not support decimal values, and instead simulate decimals using large integers. One Ether is stored as `1*10**18` since ETH has 18 decimal places. The same applies to all ERC20 tokens, although they do not all have the same decimals value. 


All values should be stored as large integers and all calculations should be done using integer math to best match smart contract calculations. Values should only be converted to "human readable" format (divided by their number of decimals) at the instant they are displayed on the frontend. 

**All human input values should immediately be multiplied by the decimals value of that token before it is used for any calculations.** 
:::

Sushiswap allows exchange between ETH and ERC20 tokens in either direction. Users can either set an exact input amount they want to sell, or an exact output amount they want to buy. The amount they are able to buy with a given input (or the amount they have to sell to buy a given output) is determined by only three factors: 

1. The user specified input or output amount
3. The reserve size (balance) of the input  
4. The reserve size (balance) of the output 


#### Calculate Output (user specifies input)
```javascript
numerator = inputAmount * outputReserve * 997
denominator = inputReserve * 1000 + inputAmount * 997
outputAmount = numerator / denominator
```

#### Calculate Input (user specifies output)
```javascript
numerator = outputAmount * inputReserve * 1000
denominator = (outputReserve - outputAmount) * 997
inputAmount = numerator / denominator + 1
```

#### Calculate Exchange Rate
```javascript
exchangeRate = outputAmount/inputAmount   
```

#### Calculate Liquidity Provider Fee 
```javascript
fee = inputAmount * 0.003
```


## ETH -> ERC20 Example Calculation


#### User sells one ETH for DAI tokens
```javascript
// ETH has 18 decimals
inputDecimals = 10**18

// DAI has 18 decimals 
outputDecimals = 10**18

// DAI Token
tokenAddress = "0x2448eE2641d78CC42D7AD76498917359D961A783"

// DAI Exchange
exchangeAddress = "0x77dB9C915809e7BE439D2AB21032B1b8B58F6891"

// DAI Token Contract
token = new web3.eth.Contract(tokenABI, tokenAddress);

// User sells 1 ETH
userInput = 1

// Formula
numerator = inputAmount * outputReserve * 997
denominator = inputReserve * 1000 + inputAmount * 997
outputAmount = numerator / denominator

// Multiply user input by input decimals
inputAmount = userInput * inputDecimals = 1*10*18   

// 50 ETH in reserves
inputReserve = web3.eth.getBalance(exchangeAddress) = 50*10**18  

// 50000 DAI in reserves
outputReserve = token.methods.balanceOf(exchangeAddress) = 10000*10**18

numerator = (1*10**18) * (10000*10**18) * 997
denominator = (50*10**18) * 1000 + (1*10**18) * 997 
outputAmount = numerator/denominator = 1.955016*10**20

userOutput = outputAmount/outputDecimals = 195.5016 DAI
exchange Rate = outputAmount/inputAmount = 195.5016 DAI/ETH
fee = inputAmount*0.003 = 0.003 ETH
```

## ERC20 <-> ERC20 Calculations
The exchange rate between TokenA (ERC20) and TokenB (ERC20) on ExchangeA (ETH-TokenA exchange) is determined by calculating TokenA-to-ETH on ExchangeA and then ETH-to-TokenB on ExchangeB. Below is an example of determining the TokenB output for an exact TokenA input. 

#### Calculate Output (given exact input)
```javascript
inputAmountA = userInput
inputReserveA = tokenA.methods.balanceOf(exchangeAddressA)
outputReserveA = web3.eth.getBalance(exchangeAddressA)

numeratorA = inputAmountA * outputReserveA * 997
denominatorA = inputReserveA * 1000 + inputAmountA * 997
outputAmountA = numeratorA / denominatorA

inputAmountB = outputAmountA
inputReserveB = tokenB.methods.balanceOf(exchangeAddressB)
outputReserveB = web3.eth.getBalance(exchangeAddressB)

numeratorB = inputAmountB * outputReserveB * 997
denominatorB = inputReserveB * 1000 + inputAmountB * 997
outputAmountB = numeratorB / denominatorB
```

#### Calculate Input (given exact output)
Similarily, below is an example of determining the TokenA input needed for an exact TokenB output:

```javascript
outputAmountB = userInput
inputReserveB = web3.eth.getBalance(exchangeAddressB)
outputReserveB = tokenB.methods.balanceOf(exchangeAddressB)

numeratorB = outputAmountB * inputReserveB * 1000
denominatorB = (outputReserveB - outputAmountB) * 997
inputAmountB = numeratorB / denominatorB + 1

outputAmountA = inputAmountB
inputReserveA = tokenA.methods.balanceOf(exchangeAddressA)
outputReserveA = web3.eth.getBalance(exchangeAddressA)

numeratorA = outputAmountA * inputReserveA * 1000
denominatorA = (outputReserveA - outputAmountA) * 997
inputAmountA = numeratorA / denominatorA + 1
```

#### Calculate Exchange Rate
```javascript
exchangeRate = outputAmountB/inputAmountA  
```

#### Calculate Liquidity Provider Fee 
```javascript
fee = inputAmountA * 0.006
```

## ETH <-> ERC20 Parameters
:::info
All recipient addresses should be passed in as strings. It is recommended that only checksummed addresses be accepted. 

All ETH and Token values will be large integers. These integer should be convereted to strings before making any web3 calls, since there can be issues with javascript big numbers. If there are any decimals the transactions will fail. 

Transaction deadlines are smaller numbers and can be passed in as integers or strings.  
:::

### ETH Sold
For `ethToTokenInput` tranactions, the amount of ETH sold is the ETH value attached to the function call. 

### Tokens Bought
`tokens_bought` is the output amount of an exact output, max input `ethToTokenOutput` or `tokenToTokenOutput` transaction

### Tokens Sold
`tokens_sold` is the the input amount of a `tokenToEthInput` or `tokenToTokenInput` transaction.

### ETH Bought
`eth_bought` is the output amount of a `tokenToEthOutput` transaction.

### Minimum and Maximum values
Sushiswap prices are entirely based on availible liquidity which can change between the time a transaction is signed and when it is included in a block. To prevent users from getting a worse deal than expected, all trade functions have parameters that bound the possible price slippage after which a transaction will fail. For a user given input there is a minimum output, and for a user given output there is a maximum input. To calculate these min/max values, a constant called `ALLOWED_SLIPPAGE` should be set. Eventually this should be changable through user input under an advanced tab, but for now it can be set to `0.025` (2.5%). 

#### Given Input
`minOutput = outputAmount * (1 - ALLOWED_SLIPPAGE)`

#### Given Output
`maxInput = inputAmount * (1 + ALLOWED_SLIPPAGE)` 

#### ETH -> ERC20 Example
```javascript
inputAmount = 1*10*18               // 1 ETH
inputReserve = 50*10**18            // 50 ETH
outputReserve = 10000*10**18        // 10000 DAI

numerator = inputAmount * outputReserve * 997
denominator = inputReserve * 1000 + inputAmount * 997
outputAmount = numerator / denominator
minOutput = outputAmount * (1 - ALLOWED_SLIPPAGE)

outputAmount = 1.955016*10**20       // 195.5016 DAI 

// Trade will fail if the user is going to receive less than 190.6141 DAI
minOutput = 1.906141*10**20        
```


### Deadlines
Every trading function has a `deadline` parameter. This is a safety feature that allows users to specify the a time after which a trade will no longer execute. This bounds the "free option" problem, where miners can hold signed transactions and decide to execute them based on market conditions at a future time. Eventually this should be a user selected "advanced" option, but for now it can be set to 5 minutes after the timestamp of the latest block:

```javascript
deadline = block.timestamp + 300
```

### Recipient
`recipient` is the address of the account that will receive tokens in a "trade and transfer" transaction. This feature is called **Send** in the frontend and **Transfer** in the smart contract.

## ETH -> ERC20 Trades
### ethToTokenSwapInput

```javascript
exchange.methods.ethToTokenSwapInput(
    min_tokens, deadline
).send({from: userAddress, value: ethInput})
```

### ethToTokenTransferInput
```javascript
exchange.methods.ethToTokenTransferInput(
    min_tokens, deadline, recipient
).send({from: userAddress, value: ethInput})
```

### ethToTokenSwapOutput

```javascript
exchange.methods.ethToTokenSwapOutput(
    tokens_bought, deadline
).send({from: userAddress, value: maxEth})
```

### ethToTokenTransferOutput

```javascript
exchange.methods.ethToTokenTransferOutput(
    tokens_bought, deadline, recipient
).send({from: userAddress, value: maxEth})
```

## ERC20 -> ETH Trades
### tokenToEthSwapInput

```javascript
exchange.methods.tokenToEthSwapInput(
    tokens_sold, min_eth, deadline
).send({from: userAddress})
```

### tokenToEthTransferInput
```javascript
exchange.methods.tokenToEthTransferInput(
    tokens_sold, min_eth, deadline, recipient
).send({from: userAddress})
```

### tokenToEthSwapOutput

```javascript
exchange.methods.tokenToEthSwapOutput(
    eth_bought, max_tokens, deadline
).send({from: userAddress})
```

### tokenToEthTransferOutput

```javascript
exchange.methods.tokenToEthTransferOutput(
    eth_bought, max_tokens, deadline, recipient
).send({from: userAddress})
```

## ERC20 -> ERC20 Trades
For ERC20 to ERC20 pairs `ALLOWED_SLIPPAGE` should be a higher value, since two exchanges are now fluctuating. For now lets go with `0.04` (4%).


### Parameters
#### token_addr 
The address of the token being purchased. So for a MKR -> DAI trade, the trade would be made on the MKR exchange and the DAI token address would be passed in as `token_addr` 

#### min_eth_bought 
For tokenToTokenInput trades, `min_eth_bought` can be used used to bound slippage on a per exchange basis instead of across both exchanges. This is unnecessary for most people who will only care about `min_tokens_bought`. The call will fail if its set to 0, so we can set it to 1. 

#### max_eth_sold 
For tokenToTokenOutput trades, `max_eth_sold` can be used used to bound slippage on a per exchange basis instead of across both exchanges. This is unnecessary for most people who will only care about `max_tokens_sold`. The expected value of ETH purchased on exchange 1 and sold to Exchange 2 is represented by `inputAmountB` in the block of code below. 

```javascript
outputAmountB = userInput
inputReserveB = web3.eth.getBalance(exchangeAddressB)
outputReserveB = tokenB.methods.balanceOf(exchangeAddressB)

numeratorB = outputAmountB * inputReserveB * 1000
denominatorB = (outputReserveB - outputAmountB) * 997
inputAmountB = numeratorB / denominatorB + 1

outputAmountA = inputAmountB
inputReserveA = tokenA.methods.balanceOf(exchangeAddressA)
outputReserveA = web3.eth.getBalance(exchangeAddressA)

numeratorA = outputAmountA * inputReserveA * 1000
denominatorA = (outputReserveA - outputAmountA) * 997
inputAmountA = numeratorA / denominatorA + 1
```

To make sure the code executes, max_eth_sold can be set to `1.2 * inputAmountB`.


### tokenToTokenSwapInput

```javascript
exchange.methods.tokenToTokenSwapInput(
    tokens_sold, 
    min_tokens_bought, 
    min_eth_bought, 
    deadline, 
    token_addr
).send({from: userAddress})
```

### tokenToTokenTransferInput
```javascript
exchange.methods.tokenToTokenTransferInput(
    tokens_sold, 
    min_tokens_bought, 
    min_eth_bought, 
    deadline, 
    recipient, 
    token_addr
).send({from: userAddress})
```

### tokenToTokenSwapOutput

```javascript
exchange.methods.tokenToTokenSwapOutput(
    tokens_bought, 
    max_tokens_sold, 
    max_eth_sold, 
    deadline, 
    token_addr
).send({from: userAddress})
```

### tokenToTokenTransferOutput

```javascript
exchange.methods.tokenToTokenTransferOutput(
    tokens_bought, 
    max_tokens_sold, 
    max_eth_sold, 
    deadline, 
    recipient,
    token_addr
).send({from: userAddress})
```

## Liquidity Pool User Balance
A users liquidity pool balance can be found with the following function call (also shown earlier in this document):
```javascript 
// You can also use tokenABI here since balanceOf is an ERC20 function
exchangeContract = new web3.eth.Contract(exchangeABI, exchangeAddress)

userPoolBalance = exchangeContract.methods.balanceOf(userAddress)
```

## Liquidity Pool Total Supply
The total supply of all liquidity is found with the following function call:
```javascript 
// You can also use tokenABI here since totalSupply is an ERC20 function
exchangeContract = new web3.eth.Contract(exchangeABI, exchangeAddress);

totalSupply = exchangeContract.methods.balanceOf(userAddress)
```

## Liquidity Pool Marginal Exchange Rate
The exchange rate displayed in the pool section is the rate as if you bought an infintessimally small purchase in either dection. It is calculated by dividing the token reserve over the eth reserve. 

```javascript
ethReserve = web3.eth.getBalance(exchangeAddress)
tokenReserve.methods.balanceOf(exchangeAddressB)

exchangeRate = tokenReserve / ethReserve
```

## Add Liquidity Calculations
### Liquidity Amount 
The amount of ETH sent to the `addLiquidity` function determines the number of liquidity tokens that will be minted for the user.

```javascript
ethReserve = web3.eth.getBalance(exchangeAddress)
totalLiquidity = exchange.methods.totalSupply()

liquidityMinted = totalLiquidity * ethAmount / ethReserve 
```

### Token Amount 
The amount of ETH sent to the `addLiquidity` function also determines the amount of ERC20 tokens needed.

```javascript
ethReserve = web3.eth.getBalance(exchangeAddress)
tokenReserve.methods.balanceOf(exchangeAddress)

// +1 added to prevent rounding errors from working against
// existing liquidity providers 
tokenAmount = tokenReserve * ethAmount / ethReserve + 1
```

If a user wants to input a specific amount of tokens, working backwards through this formula will give you the required ETH amount.

## Add Liquidity

### Parameters (if total supply is 0)

When the total number of liquidity tokens in an exchange is 0 the first liquidity provider to join the pool can choose any exchange rate. 

#### min_liquidity
`min_liqudity` is not used at all when `totalSupply == 0`. It should be set to 0 in this case. 

#### max_tokens
When `totalSupply == 0`, `max_tokens` is the same as the amount of tokens added to the pool (user input). 

#### ethAmount
`ethAmount` is the user input amount of ETH added to the pool. When there is no liqudity in an exchange, `ethAmount` must be greater than `1 gwei` (`0.000000001 ETH`).

#### deadline
Same as trading functions.

### Parameters (if total supply is greater than 0)
When the total number of liquidity tokens is greater than 0, liquidity providers must add liquidity at the current exchange rate.

#### min_liquidity
Variance in the amount of liquidity minted can be bounded by the `min_liquidity` paramter. For this we will need a `MAX_LIQUIDITY_SLIPPAGE` variable, which we can set to 0.025 or 2.5%. 

```javascript
min_liquidity = liquidityMinted * (1 - MAX_LIQUIDITY_SLIPPAGE)
```

#### max_tokens
`token_amount` can fluctuate and is bounded with the `max_tokens` variable.

```javascript
max_tokens = tokenAmount * (1 + MAX_LIQUIDITY_SLIPPAGE)
```

### Function Call
```javascript
exchange.methods.addLiquidity(
    min_liquidity, 
    max_tokens, 
    deadline 
).send({from: userAddress, value: ethAmount})
```
## Remove Liquidity Calculations
### ETH Withdrawn
The amount of ETH withdrawn from the `removeLiquidity` function is determined by the number of liquidity tokens that the user burns (user input).

```javascript
ethReserve = web3.eth.getBalance(exchangeAddress)
totalLiquidity = exchange.methods.totalSupply()

ethWithdrawn = ethReserve * liquidityBurned / totalLiquidity 
```

### Tokens Withdrawn
The amount of ERC20 tokens withdrawn from the `removeLiquidity` function is determined by the number of liquidity tokens that the user burns (user input).

```javascript
tokenReserve.methods.balanceOf(exchangeAddress)
totalLiquidity = exchange.methods.totalSupply()

tokensWithdrawn = tokenReserve * liquidityBurned / total_liquidity
```

## Remove Liquidity
### Parameters
#### amount
The user input amount of liquidity tokens burned.

#### min_eth 
Used to bound the minimum amount of ETH withdrawn for burning `amount` of liquidity tokens.

#### min_tokens
Used to bound the minimum amount of ERC20 tokens withdrawn for burning `amount` of liquidity tokens.

#### deadline
Same as trading functions.

#### Function Call
```javascript
exchange.methods.removeLiquidity(
    amount,
    min_eth, 
    min_tokens, 
    deadline 
).send({from: userAddress})
```
