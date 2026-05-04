const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const twilio = require('twilio')
const app = express()



// Security middleware //
/*const corsOption = {
    origin:[process.env.CORS_ORIGIN_ONE,process.env.CORS_ORIGIN_TWO],
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus:200
}*/
//app.use(cors(corsOption))
app.use(cors({
    origin:[process.env.CORS_ORIGIN_TWO,process.env.CORS_ORIGIN_ONE],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus:200
}))
//app.options('*', cors()); // Handle preflight requests
app.use(helmet())

//Body parsing middleware//
app.use(express.json({limit:'100mb'}))
//app.use(express.json())

module.exports = app



