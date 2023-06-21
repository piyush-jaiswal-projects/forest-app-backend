
import mongoose from "mongoose";
import schema from '../database/schema.js';
import dotenv from 'dotenv';

dotenv.config();

const Animal = mongoose.model("Animal", schema.animalSchema);

export default function onlineAnimals(req, res) {
    var i, count;
    Animal.count({ Status: "online" }, function (err, totalOnlineAnimals) {
        console.log("Error (onlineAnimals): ", err);
        count = totalOnlineAnimals;
    });

    var onlineAnimalResponseData = '';
    var jsonOnlineAnimalData = '';
    Animal.find({ Status: "online" }, function (err, foundOnlineAnimals) {
        if (!err) {
            for (i = 0; i < count; i++) {
                const onlineAnimalData = {
                    AnimalID: foundOnlineAnimals[i]._id,
                    Icon: foundOnlineAnimals[i].Icon,
                    Name: foundOnlineAnimals[i].Name
                }
                //converting array element
                jsonOnlineAnimalData = JSON.stringify(onlineAnimalData);
                onlineAnimalResponseData = onlineAnimalResponseData + jsonOnlineAnimalData;
            }

            res.status(200).end(onlineAnimalResponseData);
        }
        else {
            console.log("Error (onlineAnimals): ", err);
            res.status(400).send();
        }
    });
}