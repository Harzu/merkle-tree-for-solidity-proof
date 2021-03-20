/// <reference types="node" />
import { Validator, RootGetter, ProofGetter } from './interfaces';
export default class MerkleTree implements ProofGetter, RootGetter, Validator {
    private layers;
    private elements;
    constructor(elements: string[], preserveOrder: boolean);
    getRootBuffer(): Buffer;
    getRootHex(): string;
    private getRoot;
    getProofBuffer(element: string): Buffer[];
    getProofHex(element: string): string[];
    private getProof;
    getProofOrderedBuffer(element: string, index: number): Buffer[];
    getProofOrderedHex(element: string, index: number): string[];
    private getProofOrdered;
    validate(proof: Buffer[], root: Buffer, element: string): boolean;
    validateOrdered(proof: Buffer[], root: Buffer, element: string, index: number): boolean;
}
