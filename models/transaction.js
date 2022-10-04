const mongoose = require('mongoose');

const transactionsSchema = mongoose.Schema({

    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true, },
    catagory: { type: String, required: true, },
    reference: { type: String, required: true, },
    description: { type: String, required: true, },
    date: { type: Date, required: true, },

})

const TransactionModel = mongoose.model('Transaction', transactionsSchema)

module.exports = TransactionModel