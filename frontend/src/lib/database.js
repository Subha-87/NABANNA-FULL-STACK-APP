const mongoose = require('mongoose');
//const path = require('path');
const MONGO_URI = process.env.MONGODB_LOCAL_URI

//require('dotenv').config({path:'../.env.local'});
const connectDB = async() => {
    try {
        if(mongoose.connection.readyState === 1){
            console.log("DB is already Connected")
            return
        }
        //await mongoose.connect(process.env.MONGODB_LOCAL_URI)
        await mongoose.connect(MONGO_URI)
        console.log("FrontEnd MongoDB Connected : New Connection is Made");
    } catch (error) {
        console.error("DataBase Connection Error:", error.message);
        process.exit(1);
    }
}

module.exports = connectDB
module.exports.default = connectDB