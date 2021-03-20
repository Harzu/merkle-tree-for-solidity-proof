"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_utils_1 = require("web3-utils");
function combinedHash(first, second, preserveOrder) {
    if (!second)
        return first;
    if (!first)
        return second;
    var buf = (preserveOrder) ? bufJoin(first, second) : bufSortJoin(first, second);
    // @ts-ignore
    return Buffer.from(web3_utils_1.hexToBytes(web3_utils_1.soliditySha3(web3_utils_1.encodePacked(buf))));
}
exports.combinedHash = combinedHash;
function getNextLayer(elements, preserveOrder) {
    return elements.reduce(function (layer, element, index, arr) {
        if (index % 2 == 0)
            layer.push(combinedHash(element, arr[index + 1], preserveOrder));
        return layer;
    }, []);
}
exports.getNextLayer = getNextLayer;
function getLayers(elements, preserveOrder) {
    if (elements.length == 0)
        return [[]];
    var layers = [];
    layers.push(elements);
    while (layers[layers.length - 1].length > 1) {
        layers.push(getNextLayer(layers[layers.length - 1], preserveOrder));
    }
    return layers;
}
exports.getLayers = getLayers;
function getProof(index, layers, hex) {
    var proof = layers.reduce(function (proof, layer) {
        var pair = getPair(index, layer);
        if (pair)
            proof.push(pair);
        index = Math.floor(index / 2);
        return proof;
    }, []);
    return (hex) ? proof.map(function (e) { return '0x' + e.toString('hex'); }) : proof;
}
exports.getProof = getProof;
function getPair(index, layer) {
    var pairIndex = index % 2 ? index - 1 : index + 1;
    return (pairIndex < layer.length) ? layer[pairIndex] : null;
}
exports.getPair = getPair;
function getBufIndex(element, array) {
    for (var i = 0; i < array.length; i++) {
        if (element.equals(array[i])) {
            return i;
        }
    }
    return -1;
}
exports.getBufIndex = getBufIndex;
function bufToHex(element) {
    return Buffer.isBuffer(element) ? '0x' + element.toString('hex') : element;
}
exports.bufToHex = bufToHex;
function bufJoin(first, second) {
    return Buffer.concat([first, second]);
}
exports.bufJoin = bufJoin;
function bufSortJoin(first, second) {
    return Buffer.concat([first, second].sort(Buffer.compare));
}
exports.bufSortJoin = bufSortJoin;
function bufDedup(buffers) {
    return buffers.filter(function (buffer, i) { return getBufIndex(buffer, buffers) == i; });
}
exports.bufDedup = bufDedup;
//# sourceMappingURL=util.js.map