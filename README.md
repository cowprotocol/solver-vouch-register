# Vouch Register for Solver Bonding

A _bonding pool_ is a Gnosis Safe instance that is owned solely by the CoW DAO.
Its creator escrows the amount specified in the [CIP](https://snapshot.org/#/cow.eth/proposal/0x267edf7a0bd3c771cfca763322f011ee106d8d5158612c11da29183260d1dba7) to guarantee that none of the vouched solvers misbehaves.
The provided contract allows bonding pools to either vouch or invalidate a vouch for a solver.

The provided contract must be called by addresses that escrowed the funds to the bonding pool.
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

The contract can be deployed on rinkeby-chain by running:

```sh
export PK='your PK'
export INFURA_KEY='your infura key here'
export GAS_PRICE=10
yarn deploy --network rinkeby
```

## Verifying on Etherscan:

```sh
export ETHERSCAN_API_KEY=<your etherscan api key>
yarn verify:etherscan --network rinkeby  
```
