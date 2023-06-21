
import mongoose from "mongoose";
import schema from "../database/schema.js";

const Animal = mongoose.model("Animal", schema.animalSchema);

export default function animalHealthDetails(req, res) {
  var status = '';
  Animal.count({ HealthCondition: "Critical" }, (err, count1) => {
    if (!err) {
      status += JSON.stringify({ "Critical Animals": count1 });
    } else {
      console.log("Error (animalHealthDetails):  ", err);
    }
  });
  Animal.count({ HealthCondition: "Normal" }, (err, count2) => {
    if (!err) {
      status += JSON.stringify({ "Normal Health Animals": count2 });
    } else {
      console.log("Error (animalHealthDetails): ", err);
    }
  });
  Animal.count({ HealthCondition: "Healthy" }, (err, count3) => {
    if (!err) {
      status += JSON.stringify({ "Healthy Animals": count3 });
      res.status(200).end(status);
    } else {
      res.status(400).send();
    }
  });
}
