import * as utils from './util';
import { hexToBytes } from 'web3-utils';
export default class MerkleTree {
    constructor(elements, preserveOrder) {
        this.elements = elements.
            filter(e => e).
            map(e => Buffer.from(hexToBytes(e)));
        if (this.elements.some((e) => !(e.length == 32 && Buffer.isBuffer(e)))) {
            throw new Error('elements must be 32 byte buffers');
        }
        if (!preserveOrder) {
            this.elements = utils.bufDedup(this.elements);
            this.elements.sort(Buffer.compare);
        }
        this.layers = utils.getLayers(this.elements, preserveOrder);
    }
    getRootBuffer() {
        return this.getRoot(false);
    }
    getRootHex() {
        return this.getRoot(true);
    }
    getRoot(hex) {
        const rootLayer = this.layers[this.layers.length - 1];
        if (rootLayer.length !== 1) {
            throw new Error('failed to get root layer: root layer is invalid');
        }
        if (hex) {
            return '0x' + rootLayer[0].toString('hex');
        }
        return rootLayer[0];
    }
    ;
    getProofBuffer(element) {
        return this.getProof(element, false);
    }
    getProofHex(element) {
        return this.getProof(element, true);
    }
    getProof(element, hex) {
        const elementBuffer = Buffer.from(hexToBytes(element));
        const index = utils.getBufIndex(elementBuffer, this.elements);
        if (index == -1) {
            throw new Error('element not found in merkle tree');
        }
        return utils.getProof(index, this.layers, hex);
    }
    ;
    getProofOrderedBuffer(element, index) {
        return this.getProofOrdered(element, index, false);
    }
    getProofOrderedHex(element, index) {
        return this.getProofOrdered(element, index, true);
    }
    getProofOrdered(element, index, hex) {
        const elementBuffer = Buffer.from(hexToBytes(element));
        if (!(elementBuffer.equals(this.elements[index]))) {
            throw new Error('element does not match leaf at index in tree');
        }
        return utils.getProof(index, this.layers, hex);
    }
    validate(proof, root, element) {
        const elementBuffer = Buffer.from(hexToBytes(element));
        return root.equals(proof.reduce((hash, pair) => {
            return utils.combinedHash(hash, pair, false);
        }, elementBuffer));
    }
    validateOrdered(proof, root, element, index) {
        let tempHash = Buffer.from(hexToBytes(element));
        index++;
        for (let i = 0; i < proof.length; i++) {
            if (index % 2 === 0) {
                tempHash = utils.combinedHash(proof[i], tempHash, true);
            }
            else {
                tempHash = utils.combinedHash(tempHash, proof[i], true);
            }
            index = Math.round(index / 2);
        }
        return tempHash.equals(root);
    }
}
//# sourceMappingURL=merkle_tree.js.map