
import mongoose from "mongoose";
import schema from '../database/schema.js';
import dotenv from 'dotenv';
dotenv.config();

const Animal = mongoose.model("Animal", schema.animalSchema);

//function to count total number of animals
export default function totalAnimals(req, res) {
    var totalAnimals;
    Animal.count(function (err, totalAnimals) {
        if (!err) {
            const totalAnimalsData = {
                TotalAnimalsCount: totalAnimals
            };
            const jsonContent = JSON.stringify(totalAnimalsData);
            res.status(200).end(jsonContent);
        }
        else {
            console.log("Error (totalAnimals): ", err);
            res.status(400).send();
        }
    });
}