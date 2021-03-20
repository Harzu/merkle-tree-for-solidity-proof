import { encodePacked, hexToBytes, soliditySha3 } from 'web3-utils';
export function combinedHash(first, second, preserveOrder) {
    if (!second)
        return first;
    if (!first)
        return second;
    // @ts-ignore
    const buf = (preserveOrder) ? bufJoin(first, second) : bufSortJoin(first, second);
    // @ts-ignore
    return Buffer.from(hexToBytes(soliditySha3(encodePacked(buf))));
}
export function getNextLayer(elements, preserveOrder) {
    return elements.reduce((layer, element, index, arr) => {
        if (index % 2 == 0) {
            layer.push(combinedHash(element, arr[index + 1], preserveOrder));
        }
        return layer;
    }, []);
}
export function getLayers(elements, preserveOrder) {
    if (elements.length == 0) {
        return [[]];
    }
    const layers = [];
    layers.push(elements);
    while (layers[layers.length - 1].length > 1) {
        layers.push(getNextLayer(layers[layers.length - 1], preserveOrder));
    }
    return layers;
}
export function getProof(index, layers, hex) {
    const proof = layers.reduce((proof, layer) => {
        let pair = getPair(index, layer);
        if (pair)
            proof.push(pair);
        index = Math.floor(index / 2);
        return proof;
    }, []);
    if (hex) {
        return proof.map(e => '0x' + e.toString('hex'));
    }
    else {
        return proof;
    }
}
export function getPair(index, layer) {
    let pairIndex = index % 2 ? index - 1 : index + 1;
    if (pairIndex < layer.length) {
        return layer[pairIndex];
    }
    else {
        return null;
    }
}
export function getBufIndex(element, array) {
    for (let i = 0; i < array.length; i++) {
        if (element.equals(array[i])) {
            return i;
        }
    }
    return -1;
}
export function bufToHex(element) {
    return Buffer.isBuffer(element) ? '0x' + element.toString('hex') : element;
}
export function bufJoin(first, second) {
    return Buffer.concat([first, second]);
}
export function bufSortJoin(first, second) {
    return Buffer.concat([first, second].sort(Buffer.compare));
}
export function bufDedup(buffers) {
    return buffers.filter((buffer, i) => {
        return getBufIndex(buffer, buffers) == i;
    });
}
//# sourceMappingURL=util.js.map