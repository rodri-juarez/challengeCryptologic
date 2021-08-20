const Web3 = require("web3");
const web3 = new Web3("https://matic-mainnet.chainstacklabs.com/");
const mongoose = require("mongoose");
const Transaction = require("../db/model");
const connection = require("../db/dbConnection");

const tx = "0x2b1cb0ee5c14b33d1871a671c235dce2972861a1ad1410659251f0b9d7fac39f";

const getTransactionInfo = async () => {
  const txInDataBase = await Transaction.findOne({
    transactionHash: tx,
  }).exec();

  if (txInDataBase) {
    return console.log("transaction found", txInDataBase);
  } else {
    web3.eth.getTransactionReceipt(tx, async (error, result) => {

      if (error) return console.error(`Error message:${error.message}`);
      
      const newTransaction = new Transaction({
        blockHash: result.blockHash,
        blockNumber: result.blockNumber,
        contractAddress: result.contractAddress,
        cumulativeGasUsed: result.cumulativeGasUsed,
        from: result.from,
        gasUsed: result.gasUsed,
        logs: result.logs.map((element) => {
          return {
            address: element.address,
            topics: element.topics,
            data: element.data,
            blockNumber: element.blockNumber,
            transactionHash: element.transactionHash,
            transactionIndex: element.transactionIndex,
            blockHash: element.blockHash,
            logIndex: element.logIndex,
            removed: element.removed,
            id: element.id,
          };
        }),

        logsBloom: result.logsBloom,
        status: result.status,
        to: result.to,
        transactionHash: result.transactionHash,
        transactionIndex: result.transactionIndex,
        type: result.type,
      });

      const transactionSaved = await newTransaction.save();

      return console.log("transaction created", transactionSaved);
    });
  }
};

getTransactionInfo();
