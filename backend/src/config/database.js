const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose');
//const path = require('path');

//require('dotenv').config({path:'../.env'});
const MONGO_URL = process.env.MONGODB_LOCAL_URI
const connectDB = async() => {
    try {
        if(mongoose.connection.readyState === 1){
            console.log("Shared DB is already Connected")
           return
        }
        await mongoose.connect(MONGO_URL)
        console.log("Express MongoDB Connected : New Connection is Made");
    } catch (error) {
        console.error("DataBase Connection Error:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB
module.exports.default = connectDB
