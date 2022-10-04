
const express = require('express');
const router = express.Router()
const moment = require('moment');

const TransactionModel = require('../models/transaction')



/**
 * Post request to add a transaction
 */

router.post('/addtransaction', async (req, res) => {

    try {
        const newTransaction = new TransactionModel(req.body)
        await newTransaction.save()
        res.send('Transaction added successfully')

    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

/**
 * Post request to get all transaction data of the logged in user
 */
router.post('/getalltransactions', async (req, res) => {
    const { frequency, selectedRange, type } = req.body

    try {
        const transactions = await TransactionModel.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(req.body.frequency), 'd').toDate()
                },
            } : {
                date: {
                    $gte: selectedRange[0],
                    $lte: selectedRange[1],
                }
            }),
            userId: req.body.userId,

            ...(type !== 'all' && { type })
        })
        res.send(transactions)
    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

/**
 * Post request to edit a transaction
 */

router.post('/edittransaction', async (req, res) => {

    try {
        await TransactionModel.findOneAndUpdate({ _id: req.body.transactionId }, req.body.payload)

        res.send('Transaction updated successfully')

    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

/**
 * Post request to delete a transaction
 */

router.post('/deletetransaction', async (req, res) => {

    try {
        await TransactionModel.findOneAndDelete({ _id: req.body.transactionId })

        res.send('Transaction Deleted successfully')

    }
    catch (error) {
        res.status(500).json({ message: error })
    }
})

module.exports = router