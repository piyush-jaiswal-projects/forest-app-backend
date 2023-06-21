import mongoose from "mongoose";
import schema from "../database/schema.js";

const Animal = mongoose.model("Animal", schema.animalSchema);

export default function particularAnimalDetail(req, res) {
    Animal.findById({ _id: req.body.animalid}, function (err, foundAnimal) {
    if (!err) {
      const AnimalData = {
        AnimalID: foundAnimal._id,
        Icon: foundAnimal.Icon,
        Name: foundAnimal.Name,
        HealthCondition: foundAnimal.HealthCondition,
        Status: foundAnimal.Status,
        Location: foundAnimal.Location,
        OtherInformation: foundAnimal.OtherInformation,
      };
      const jsonAnimalData = JSON.stringify(AnimalData);
      res.status(200).send(jsonAnimalData);
    } else {
      console.log("Error (particularAnimalDetail): ", err);
      res.status(400).send();
    }
  });
}
