const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const express = require("express");
const path = require("path");
const itItemsRouter = require("./routes/itItemsRoute");

const itLetterRouter = require("./routes/itRequisitionRoute");

const netDataRouter = require("./routes/netRoute");

const voiceRouter = require("./routes/voiceRoute");

const complainRouter = require("./routes/complainRoute");
const estimateRouter = require("./routes/estimateRoute");

const hardwareRouter = require("./routes/hardwareRoute");

const aiRoutes = require("./routes/aiRoute");

const messageRoutes = require("./routes/complainMsgRoute");

const setTopBoxRoutes = require("./routes/boxRoute")

const cablelTvRoutes = require("./routes/catvRoute")

const it_app = require("./app");
//const connectDB = require('./config/database')
//const connectDB = require('../../shared/database')
const connectDB = require("./config/database");

const isDev = process.env.NODE_ENV !== "production";
const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.BACKEND_PORT || 5000;
const HOST = isDev ? "localhost" : "127.0.0.1";

const Local_URL = process.env.EXPRESS_SERVER_IP;


// Trust proxy only in PROD (NGINX)
if (!isDev) {
  it_app.set("trust proxy", 1);
}

// CORS only for DEV
if (isDev) {
  it_app.use(
    cors({
      origin: "http://localhost:4000",
      credentials: true,
    }),
  );
}
// Connect DataBase//

connectDB();
const allowedOrigins = ["http://localhost:4000", "http://10.10.119.160"];

// Incoming Nabanna IT ITEMS Crud Management - GET/POST/PUT/DELETE //

it_app.use("/itemNabanna", itItemsRouter);

// Incoming Nabanna LETTER Crud Management - GET/POST/PUT/DELETE //

it_app.use("/ItReq", itLetterRouter);

// Task Assign for It user  ( Net Data)

it_app.use("/TaskData", netDataRouter);

// Voice Data Crud Management(Handlers)
it_app.use("/voiceTask", voiceRouter);

// User Comaplin Crud Managment //
it_app.use("/complain", complainRouter);

// Estimate Crud //
//it_app.use('/api/estimateReg',estimateRouter)
it_app.use("/estimateReg", estimateRouter);

it_app.use(
  "/ApprovalFolder",
  express.static(path.join(process.cwd(), "public", "ApprovalFolder")),
);
it_app.use(
  "/EstimateFolder",
  express.static(path.join(process.cwd(), "public", "EstimateFolder")),
);
it_app.use(
  "/RequisitionFolder",
  express.static(path.join(process.cwd(), "public", "RequisitionFolder")),
);
/*it_app.use(
  "/ChallanFolder",
  express.static(path.join(process.cwd(),'public', "ChallanFolder"),{
    setHeaders: (res) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
      // 🔥 THIS FIXES NotSameOrigin 200
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      res.setHeader("Cache-Control", "no-store"); // 🚨 prevents 304
      
      
    },
  })
);*/

if (isProd) {
  it_app.use(
    "/ChallanFolder",
    express.static(path.join(process.cwd(), "public", "ChallanFolder"), {
      setHeaders: (res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
        res.setHeader("Cache-Control", "public, max-age=31536000");
      },
    }),
  );
}

it_app.use(
  "/WorkOrderFolder",
  express.static(path.join(process.cwd(), "public", "WorkOrderFolder")),
);

it_app.use("/NabannaSystem", hardwareRouter);


it_app.use("/NabannaTV",cablelTvRoutes)

//** AI INCOMING QUERY *//
it_app.use("/AIagent/ai", aiRoutes);

// Message Routes (SMS & Whats-APP) //
it_app.use("/publicMsg",messageRoutes)

it_app.use("/nabanna",setTopBoxRoutes)


// TEST FOR BACKEND RUNNING OR NOT // TO TEST BACKEND  in Browser :http://127.0.0.1:5000
it_app.get("/", (req, res) => {
  res.json({
    status: "Backend is running",
    server: "Nabanna Express API",
    port: 5000,
  });
});



it_app.listen(PORT, HOST, () => {
  console.log(
    `Backend running in ${isDev ? "DEV" : "PROD"} mode → http://${HOST}:${PORT}`,
  );
});


/*it_app.listen(PORT, () => {
  console.log(`Express.JS Backend running on port ${PORT}`);
});*/

/*it_app.listen(PORT,"0.0.0.0", () => { // 0.0.0.0 is very import for cross domain request //
  console.log(`Express Server API Running on Url: http://${Local_URL}:${PORT}`);
});*/
