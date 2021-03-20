"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils = __importStar(require("./util"));
var web3_utils_1 = require("web3-utils");
var MerkleTree = /** @class */ (function () {
    function MerkleTree(elements, preserveOrder) {
        this.elements = elements.
            filter(function (e) { return e; }).
            map(function (e) { return Buffer.from(web3_utils_1.hexToBytes(e)); });
        if (this.elements.some(function (e) { return !(e.length == 32 && Buffer.isBuffer(e)); })) {
            throw new Error('elements must be 32 byte buffers');
        }
        if (!preserveOrder) {
            this.elements = utils.bufDedup(this.elements);
            this.elements.sort(Buffer.compare);
        }
        this.layers = utils.getLayers(this.elements, preserveOrder);
    }
    MerkleTree.prototype.getRootBuffer = function () {
        return this.getRoot(false);
    };
    MerkleTree.prototype.getRootHex = function () {
        return this.getRoot(true);
    };
    MerkleTree.prototype.getRoot = function (hex) {
        var rootLayer = this.layers[this.layers.length - 1];
        if (rootLayer.length !== 1) {
            throw new Error('failed to get root layer: root layer is invalid');
        }
        if (hex) {
            return '0x' + rootLayer[0].toString('hex');
        }
        return rootLayer[0];
    };
    ;
    MerkleTree.prototype.getProofBuffer = function (element) {
        return this.getProof(element, false);
    };
    MerkleTree.prototype.getProofHex = function (element) {
        return this.getProof(element, true);
    };
    MerkleTree.prototype.getProof = function (element, hex) {
        var elementBuffer = Buffer.from(web3_utils_1.hexToBytes(element));
        var index = utils.getBufIndex(elementBuffer, this.elements);
        if (index == -1) {
            throw new Error('element not found in merkle tree');
        }
        return utils.getProof(index, this.layers, hex);
    };
    ;
    MerkleTree.prototype.getProofOrderedBuffer = function (element, index) {
        return this.getProofOrdered(element, index, false);
    };
    MerkleTree.prototype.getProofOrderedHex = function (element, index) {
        return this.getProofOrdered(element, index, true);
    };
    MerkleTree.prototype.getProofOrdered = function (element, index, hex) {
        var elementBuffer = Buffer.from(web3_utils_1.hexToBytes(element));
        if (!(elementBuffer.equals(this.elements[index]))) {
            throw new Error('element does not match leaf at index in tree');
        }
        return utils.getProof(index, this.layers, hex);
    };
    MerkleTree.prototype.validate = function (proof, root, element) {
        var elementBuffer = Buffer.from(web3_utils_1.hexToBytes(element));
        return root.equals(proof.reduce(function (hash, pair) {
            return utils.combinedHash(hash, pair, false);
        }, elementBuffer));
    };
    MerkleTree.prototype.validateOrdered = function (proof, root, element, index) {
        var tempHash = Buffer.from(web3_utils_1.hexToBytes(element));
        index++;
        for (var i = 0; i < proof.length; i++) {
            if (index % 2 === 0) {
                tempHash = utils.combinedHash(proof[i], tempHash, true);
            }
            else {
                tempHash = utils.combinedHash(tempHash, proof[i], true);
            }
            index = Math.round(index / 2);
        }
        return tempHash.equals(root);
    };
    return MerkleTree;
}());
exports.default = MerkleTree;
//# sourceMappingURL=merkle_tree.js.map