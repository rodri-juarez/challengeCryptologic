const mongoose = require("mongoose");

const transaction = new mongoose.Schema({
  blockHash: String,
  blockNumber: Number,
  contractAddress: String,
  cumulativeGasUsed: Number,
  from: String,
  gasUsed: Number,
  logs: [
    {
      address: String,
      topics: [],
      data: String,
      blockNumber: Number,
      transactionHash: String,
      transactionIndex: Number,
      blockHash: String,
      logIndex: Number,
      removed: Boolean,
      id: String,
    },
  ],
  logsBloom: String,
  status: Boolean,
  to: String,
  transactionHash: String,
  transactionIndex: Number,
  type: String,
});

module.exports = mongoose.model("transaction", transaction);
