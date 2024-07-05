const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  // Define your schema fields here
  dateOfSale: String,
  title: String,
  description: String,
  price: Number,
  category: String,
  sold: Boolean,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
