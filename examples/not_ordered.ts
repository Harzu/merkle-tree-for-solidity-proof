import MerkleTree from '../src'
import { soliditySha3 } from 'web3-utils'

const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(e => soliditySha3(e))
console.log(elements)

const merkleTree = new MerkleTree(elements, false)

console.log(merkleTree)
const root = merkleTree.getRootBuffer()
console.log(root)
const proof = merkleTree.getProofBuffer(elements[0])
console.log(proof)

const rootHex = merkleTree.getRootHex()
const proofHex = merkleTree.getProofHex(elements[0])
console.log('proofHex', proofHex)
console.log('rootHex', rootHex)
console.log('element', elements[0])

const valid = merkleTree.validate(proof, root, elements[0])
console.log(valid)