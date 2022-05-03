# Vouch Register for Solver Bonding

The provided contract allows bonding pools - as described in this [cip](https://snapshot.org/#/cow.eth/proposal/0x267edf7a0bd3c771cfca763322f011ee106d8d5158612c11da29183260d1dba7) - to either vouch or invalidate a vouch for a solver.
The provided contract must be called by addresses that created the bonding pool. Calls from other addresses will not be officially indexed and it will not start the allowlisting process for new solvers for the COW-Protocol.
In case of conflicting vouching votes (e.g. two bonding pools vote for the same solver with different cow reward targets, the first vouch will be seen as the valid one).


## Setting up the project

```sh
yarn install
yarn build
```

## Deployment

The contract can be deployed on rinkeby-chain by running:

```sh
export PK='your PK'
export INFURA_KEY='your infura key here'
export GAS_PRICE=10
yarn deploy --network rinkeby
```

It will be associated with the mainnet team controller address automatically.

This contract is designed to be a module for a Gnosis Safe, and before using it it needs to be activated in the controller safe.
Running the command above will print to screen instructions on how to enable the module.

## Verifying on Etherscan:

```sh
export ETHERSCAN_API_KEY=<your etherscan api key>
yarn verify:etherscan --network rinkeby  
```
