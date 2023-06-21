import mongoose from "mongoose";

// Defining schemas 

var Schema = mongoose.Schema;

var userSchema = new Schema({
  Name: String,
  Contact: String,
  Username: String,
  Password: String,
  AccessToken: String,
});

var animalSchema = new Schema({
  Icon: String,
  Name: String,
  HealthCondition: String,
  Status: String,
  Location: [{ Latitude: Number, Longitude: Number, date: Date }],
  OtherInformation: String,
  FenceDetail: {
    Center: Number,
    Radius: Number,
  },
  AccessDuration: {
    userId: String,
    startTime: Date,
    endTime: Date,
  },
});


export default {
  animalSchema,
  userSchema
};
