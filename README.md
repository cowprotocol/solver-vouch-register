# Vouch Register for Solver Bonding

A _bonding pool_ is a Gnosis Safe instance that is owned solely by the CoW DAO.
Its creator escrows the amount specified in the [CIP](https://snapshot.org/#/cow.eth/proposal/0x267edf7a0bd3c771cfca763322f011ee106d8d5158612c11da29183260d1dba7) to guarantee that none of the vouched solvers misbehaves.
The provided contract allows bonding pools to either vouch or invalidate a vouch for a solver.

The provided contract must be called by the owner of the bonding pools. The owner of a bonding pool is defined as the address that escrowed the initial funding to the bonding pools - in case there are several addresses sending the initial funds to the same bonding pool, the bonding pool can not be considered.
Calls from other addresses will not be officially indexed and it will not start the allowlisting process for new solvers for the COW-Protocol.
In case of conflicting vouching votes (e.g. two bonding pools vote for the same solver with different cow reward targets), the first vouch will be seen as the valid one and the second vouch will be disregarded.
Only updates of currently valid vouches from a bonding pool (e.g. for changing the cowRewardTarget) will be considered.
Same rules holds true for the invalidation of vouches: If a solver is invalidated by a bonding pool, although the solver is currently not actively vouched by this bonding pool, the message will be disregarded.

## Setting up the project

```sh
yarn install
yarn build
```

## Deployment

The contract can be deployed on sepolia-chain by running:

```sh
export PK='your PK'
export INFURA_KEY='your infura key here'
export GAS_PRICE=10
yarn deploy --network sepolia
```

Regardless of chain and deployer, this should create the contract using CREATE2 at 0xAAA4De096D02AE21729aA31D967E148D4e3Ae501.

## Verifying on Etherscan:

```sh
export ETHERSCAN_API_KEY=<your etherscan api key>
yarn hardhat verify --network <your_network> 0xAAA4De096D02AE21729aA31D967E148D4e3Ae501
```
