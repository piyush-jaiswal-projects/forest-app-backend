import mongoose from "mongoose";
import schema from "../database/schema.js";

const Animal = mongoose.model("Animal", schema.animalSchema);

export default function saveAnimalLiveLocation(id, toSaveLocationArray) {
  Animal.find({ _id: id }, function (err, foundAnimal) {
    if (!err) {
      var locationArray = foundAnimal[0].Location;
      locationArray.push(toSaveLocationArray);

      Animal.updateOne(
        { _id: id },
        {
          $set: {
            Location: locationArray
          },
        },
        function (err, result) {
          if (err) {
            console.log("Error (saveAnimalLiveLocation): ", err);
            res.status(400).send(err);
          } else {
            res.status(200).send();
            console.log("Successfully Updated");
          }
        }
      );
    } else {
      console.log("Error (saveAnimalLiveLocation): ", err);
      res.status(400).send();
    }
  });
}
