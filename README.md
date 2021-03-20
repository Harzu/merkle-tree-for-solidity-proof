## Merkle tree implementation for solidity proof

lib allow:
- generating merkle tree (with save order / without save order elements).
- get proof for each element
- validate generated proof from javascript and solidity contracts

### Install
```bash
# With NPM
npm i merkle-tree-for-solidity-proof

# With yarn
yarn add merkle-tree-for-solidity-proof
```

### Tests run

JavaScript tests
```bash
yarn test:js
```

Tests with contract

You need to run develop chain network for run test with contracts. You need to install truffle for run develop chain network `npm i -g truffle`.

procedure:
- run develop chain `truffle develop`.
- run test command `npm run test:contract` or `yarn test:contract`.