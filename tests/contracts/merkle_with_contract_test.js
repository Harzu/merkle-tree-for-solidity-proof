const MerkleTree = require('../../lib/index.js').default
const utils = require('web3-utils')
const { assert } = require('chai')

const MerkleProofValidator = artifacts.require("MerkleProofValidator");

contract("MerkleProofValidator", () => {
  it("not ordered success validate", async () => {
    const merkleContract = await MerkleProofValidator.deployed()
    const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => utils.soliditySha3(e))
    const merkleTree = new MerkleTree(elements, false)
    const root = merkleTree.getRootHex()
    const proof = merkleTree.getProofHex(elements[4])

    const res = await merkleContract.verifyProof(proof, root, elements[4])
    assert.equal(res, true, 'not valid')
  })

  it("not ordered fail validate", async () => {
    const merkleContract = await MerkleProofValidator.deployed()
    const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => utils.soliditySha3(e))
    const merkleTree = new MerkleTree(elements, false)
    const root = merkleTree.getRootHex()
    const proof = merkleTree.getProofHex(elements[5])

    const res = await merkleContract.verifyProof(proof, root, elements[4])
    assert.equal(res, false, 'valid proof with invalid params')
  })

  it("ordered success validate", async () => {
    const merkleContract = await MerkleProofValidator.deployed()
    const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => utils.soliditySha3(e))
    const merkleTree = new MerkleTree(elements, true)
    const root = merkleTree.getRootHex()
    const proof = merkleTree.getProofOrderedHex(elements[2], 2)

    const res = await merkleContract.verifyProofOrdered(proof, root, elements[2], 2)
    assert.equal(res, true, 'not valid')
  })

  it("ordered fail validate", async () => {
    const merkleContract = await MerkleProofValidator.deployed()
    const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => utils.soliditySha3(e))
    const merkleTree = new MerkleTree(elements, true)
    const root = merkleTree.getRootHex()
    const proof = merkleTree.getProofOrderedHex(elements[3], 3)
    
    const res = await merkleContract.verifyProofOrdered(proof, root, elements[2], 2)
    assert.equal(res, false, 'valid proof with invalid params')
  })
}) 