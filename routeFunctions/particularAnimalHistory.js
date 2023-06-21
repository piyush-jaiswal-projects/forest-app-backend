// Importing required modules
import dotenv from 'dotenv';
import mongoose from "mongoose";
import schema from '../database/schema.js';

dotenv.config();

const Animal = mongoose.model("Animal", schema.animalSchema);

export default function particularAnimalHistoory(req, res) {
    var animalID = req.body.Animalid;
    var start = req.body.StartDate;
    var end = req.body.EndDate;
    var locationArray = [];
    Animal.findOne({ _id: animalID }, function (err, foundAnimal) {
        if (!err) {
            locationArray = foundAnimal.Location;


            var startIndex = locationArray.findIndex(locationArray.date == start);
            //finding index of last location of a date
            //first check month and then dates
            var endIndex = locationArray.lastIndexOf(locationArray.date == end);

            var requiredLocations = [];
            for (var i = startIndex; i <= endIndex; i++) {
                var location = {
                    Latitude: locationArray[i].Latitude,
                    Longitude: locationArray[i].Longitude
                }
                requiredLocations.push(location);
            }

            const jsonLocationData = JSON.stringify(requiredLocations);
            res.status(200).send(jsonLocationData);
        }
        else {
            res.status(400).send("Animal Not Found!");
        }

    });


}