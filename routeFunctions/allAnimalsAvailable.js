//importing modules 
import mongoose from "mongoose";
import schema from "../database/schema.js";

// To get all the animals available as per data.

const Animal = mongoose.model("Animal", schema.animalSchema);

export default function allAnimalsAvailable(req, res) {
    var count, i;
    Animal.count({}, function (err, totalAnimals) {
        if (err) console.log("Error (allAnimalsAvailable):", err);
        count = totalAnimals;
    });

    var TotalAnimalResponseData = '';
    Animal.find({}, function (err, foundAnimals) {
        if (!err) {
            // foundAnimals is array of all animal objects
            for (i = 0; i < count; i++) {
                const AnimalData = {
                    AnimalID: foundAnimals[i]._id,
                    Icon: foundAnimals[i].Icon,
                    Location: foundAnimals[i].Location
                }
                //converting array element
                const jsonAnimalData = JSON.stringify(AnimalData);
                TotalAnimalResponseData += jsonAnimalData;
            }

            res.status(200).end(TotalAnimalResponseData);
        }
        else {
            res.status(400).send();
        }
    });
}