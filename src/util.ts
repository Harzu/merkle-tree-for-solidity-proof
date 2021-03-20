import { encodePacked, hexToBytes, soliditySha3 } from 'web3-utils'

export function combinedHash(first: Buffer, second: Buffer, preserveOrder: boolean): Buffer {
  if (!second) return first;
  if (!first) return second;

  const buf = (preserveOrder) ? bufJoin(first, second) : bufSortJoin(first, second)
  // @ts-ignore
  return Buffer.from(hexToBytes(soliditySha3(encodePacked(buf))))
}

export function getNextLayer(elements: Buffer[], preserveOrder: boolean): Buffer[] {
  return elements.reduce((layer, element, index, arr) => {
    if (index % 2 == 0) layer.push(combinedHash(element, arr[index + 1], preserveOrder));
    return layer;
  }, []);
}

export function getLayers(elements: Buffer[], preserveOrder: boolean): Buffer[][] {
  if (elements.length == 0) return [[]];

  const layers = [];
  layers.push(elements);

  while (layers[layers.length - 1].length > 1) {
    layers.push(getNextLayer(layers[layers.length - 1], preserveOrder));
  }

  return layers;
}

export function getProof(index: number, layers: Buffer[][], hex: boolean): Buffer[] | string[] {
  const proof = layers.reduce((proof, layer) => {
    const pair = getPair(index, layer);
    if (pair) proof.push(pair);
    index = Math.floor(index / 2);
    return proof;
  }, []);

  return (hex) ? proof.map(e => '0x' + e.toString('hex')) : proof;
}

export function getPair(index: number, layer: Buffer[]): Buffer {
  let pairIndex = index % 2 ? index - 1 : index + 1;
  return (pairIndex < layer.length) ? layer[pairIndex] : null;
}

export function getBufIndex(element: Buffer, array: Buffer[]): number {
  for (let i = 0; i < array.length; i++) {
    if (element.equals(array[i])) {
      return i;
    }
  }

  return -1;
}

export function bufToHex(element: Buffer): string {
  return Buffer.isBuffer(element) ? '0x' + element.toString('hex') : element;
}

export function bufJoin(first: Buffer, second: Buffer): Buffer {
  return Buffer.concat([first, second])
}

export function bufSortJoin(first: Buffer, second: Buffer): Buffer {
  return Buffer.concat([first, second].sort(Buffer.compare))
}

export function bufDedup(buffers: Buffer[]): Buffer[] {
  return buffers.filter((buffer, i) => getBufIndex(buffer, buffers) == i);
}
