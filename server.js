
// Importing all required modules
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import rateLimit from "express-rate-limit";
import hsts from "hsts";
import { router } from "./routes.js";
import saveAnimalLiveLocation from "./routeFunctions/saveAnimalLiveLocation.js"
import { Server } from "socket.io";
import https from "https";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';
import helmet from "helmet";
import cluster from "cluster";
import os from "os";

dotenv.config();

// file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const numCpu = os.cpus().length;

const app = express();


// Server
// const server = https.createServer({
//   key: fs.readFileSync(path.join(__dirname, 'sslCertificate', 'key.pem')),
//   cert: fs.readFileSync(path.join(__dirname, 'sslCertificate', 'cert.pem'))
// }, app);
// let io = new Server(server);


const limiter = rateLimit({
  windowMs: 5 * 1000,
  max: 25,
  message: {
    code: 429,
    message: 'too many requests'
  },
  standardHeaders: true, 
  legacyHeaders: false, 
})


//declaring port and database url
const port = process.env.PORT || 3000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const url = `mongodb+srv://${username}:${password}@mongodatabase.slom4qc.mongodb.net/forestApp?retryWrites=true&w=majority`;
Connection(process.env.MONGODB_URI || url);


// Generating frequently changing locations
const generateNextLocation = (obj) => {
  return {
    Longitude: obj.Longitude + 0.000001,
    Latitude: obj.Latitude + 0.000001
  }
}


// declaring middleware functions
app.use(bodyParser.json({ limit: '1mb' }));
app.set("view engine", "ejs"); //ejs as templating engine
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); //static files in public directory
app.use(limiter);
app.use(helmet());
app.use(hsts({
  // Limiting payload size
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));
app.use('/', router);

app.get("/",(req,res)=>{
  console.log(`ok... ${process.pid}`);
  res.status(200).send("<h1>SMART Forest App Backend</h1>")
})

  // cluster.worker.kill();
  // res.sendFile(path.join(__dirname, 'home.html'));

// socket connection for live data streaming
app.on("connection", (socket) => {
  var locationArray = [];
  socket.on("sendLiveLocation", (startData) => {
    // console.log(startData);
    const location = generateNextLocation({ longitude: 25.4, Latitude: 78.22 })
    let interval = setInterval(() => {
      location = generateNextLocation(location)
      locationArray.push(location);
      socket.emit("location", location)
    }, 1000);
    socket.on("stopLiveLocation", () => {
      clearInterval(interval);
      saveAnimalLiveLocation(startData, locationArray);
    })
  });
});


// // using multiple CPU cores to boost speed
// if (cluster.isMaster) {
//   for (let i = 0; i < numCpu; i++) {
//     cluster.fork();
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     cluster.fork();
//   })
// }
// else {
//   server.listen(port, () => {
//     console.log(`>> Server ${process.pid} started successfully at port ${port}`);
//   });
// }

app.listen(port, () => {
  console.log(`>> Server started successfully at port ${port}`);
});



