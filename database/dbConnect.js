require('dotenv').config()
const mongoose = require('mongoose');

const dbConnect = () => {
    try {
        mongoose.connect(process.env.DATABASE_CONNECTION_URL)
        console.log('Connected to database');

    }
    catch (err) {
        console.log('Failed connecting to database: ' + err.message);
    }
}

module.exports = dbConnect