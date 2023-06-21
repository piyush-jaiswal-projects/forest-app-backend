
import mongoose from "mongoose";
import schema from '../database/schema.js';
import dotenv from 'dotenv';

dotenv.config();


const Animal = mongoose.model("Animal", schema.animalSchema);

export default function modifyAnimals(req, res) {
    var animalID = req.body.Animalid;
    Animal.updateOne({ _id: animalID }, {
        $set: {
            FenceDetail: {
                Center: req.body.Center,
                Radius: req.body.Radius
            }
        }
    },
        function (err, result) {
            if (err) {
                console.log("Error (modifyGeoFence): ", err);
                res.status(400).send();
            }
            else {
                res.status(200).send();
            }
        });
}