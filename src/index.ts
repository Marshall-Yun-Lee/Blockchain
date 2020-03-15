import * as CryptoJS from "crypto-js";

class Block {
    // ======== fields ========
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    // ========================

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    
    public static claculateBlockHash = (index: number, previousHash: string, timestamp: number, data: string): string => 
        CryptoJS.SHA256(index + previousHash + data + timestamp).toString();

    public static validateStructure = (block: Block): boolean => {
        return (typeof block.index        === "number" &&
                typeof block.hash         === "string" &&
                typeof block.previousHash === "string" &&
                typeof block.data         === "string" &&
                typeof block.timestamp    === "number");
    }
}

// ======== get ========
const getBlockChain = (): Block[] => blockChain;
const getLatestBlock = (): Block => blockChain[blockChain.length - 1];
const getTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
const getHashforBlock = (block: Block): string => Block.claculateBlockHash(block.index, block.previousHash, block.timestamp, block.data);
// =====================

// ======== chain manipulation ========
const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getTimeStamp();
    const nextHash: string = Block.claculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);

    const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, newTimeStamp);
    
    addBlock(newBlock);
    return newBlock;
}

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
}
// ====================================

// ======== validation ========
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    return (Block.validateStructure(candidateBlock) ? 
                ((previousBlock.index + 1 === candidateBlock.index) ?
                    ((previousBlock.hash === candidateBlock.previousHash) ?
                        ((getHashforBlock(candidateBlock) === candidateBlock.hash) ?
                            true
                        : false)
                    : false)
                : false)
            : false);
}
// ============================


// create the first block
const genesisBlock: Block = new Block(0, "init", "", "Hello, World!", 123123);
let blockChain: Block[] = [genesisBlock];

// ======== add blocks ========
createNewBlock("second Block");
createNewBlock("third Block");
createNewBlock("forth Block");
// ============================


console.log(blockChain);

export{};