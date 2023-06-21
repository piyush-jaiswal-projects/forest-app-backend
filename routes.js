
// importing required modules
import express from "express";
import path from "path";
import totalAnimals from "./routeFunctions/totalAnimals.js"
import  verify  from './authentication.js';
import allAnimalDetails from "./routeFunctions/allAnimalsDetails.js";
import signup from "./routeFunctions/signup.js";
import signin from "./routeFunctions/signin.js";
import modifyAnimal from "./routeFunctions/modifyAnimal.js";
import onlineAnimals from "./routeFunctions/onlineAnimals.js";
import animalHealthDetails from "./routeFunctions/animalHealthDetails.js";
import particularAnimalDetail from "./routeFunctions/particularAnimalDetail.js";
import particularAnimalHistory from "./routeFunctions/particularAnimalHistory.js";
import allAnimalsAvailable from "./routeFunctions/allAnimalsAvailable.js";
import modifyGeoFence from "./routeFunctions/modifyGeoFence.js";
import JV from "./JSONValidator.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from 'url';

const router=express.Router();


router.get("/",(req,res)=>{
    console.log(`ok... ${process.pid}`);
    res.sendFile(path.join(__dirname, 'home.html'));
    // cluster.worker.kill();
})

// declaring routes
router.post("/signup",JV.usersignupJV, signup);
router.post("/signin",JV.usersigninJV, signin);
router.post("/totalAnimals",verify, totalAnimals);
router.post("/allAnimalDetails",verify, allAnimalDetails);
router.patch("/modifyAnimal",JV.modifyAnimalJV, verify, modifyAnimal); 
router.post("/onlineAnimals",verify, onlineAnimals);
router.post("/animalHealthDetails",verify, animalHealthDetails);
router.post("/particularAnimalDetail",JV.particularAnimalDetailJV, verify, particularAnimalDetail); 
router.post("/allAnimalsAvailable",verify, allAnimalsAvailable);
router.patch("/modifyGeoFence",JV.modifyGeofenceJV, verify, modifyGeoFence);
router.post("/particularAnimalHistory",JV.particularAnimalHistoryJV, verify, particularAnimalHistory); 

export {router};