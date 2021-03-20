/// <reference types="node" />
export declare function combinedHash(first: Buffer, second: Buffer, preserveOrder: boolean): Buffer;
export declare function getNextLayer(elements: Buffer[], preserveOrder: boolean): Buffer[];
export declare function getLayers(elements: Buffer[], preserveOrder: boolean): Buffer[][];
export declare function getProof(index: number, layers: Buffer[][], hex: boolean): Buffer[] | string[];
export declare function getPair(index: number, layer: Buffer[]): Buffer;
export declare function getBufIndex(element: Buffer, array: Buffer[]): number;
export declare function bufToHex(element: Buffer): string;
export declare function bufJoin(first: Buffer, second: Buffer): Buffer;
export declare function bufSortJoin(first: Buffer, second: Buffer): Buffer;
export declare function bufDedup(buffers: Buffer[]): Buffer[];
