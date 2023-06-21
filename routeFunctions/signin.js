import mongoose from "mongoose";
import bcrypt from "bcrypt";
import schema from "../database/schema.js";

const User = mongoose.model("User", schema.userSchema);

function signin(req, res) {
  const { Username, Password } = req.body;
  User.findOne({ Username: Username }, async (err, user) => {
    if (err) console.log("Error (signin): ", err);
    if (user) {
      bcrypt.compare(Password, user.Password, function (err, result) {
        if (err) console.log("Error (signin bcrypt): ", err);
        if (result == true) {
          res.status(200).send({
            Userid: user._id,
            Name: user.Name,
            Contact: user.Contact,
            Username: user.Username,
            AccessToken: user.AccessToken
          });
        }
        else {
          res.status(401).send({ message: "Password didn't match" });
        }

      });
    } else {
      res.status(401).send({ message: "User not registered" });
    }
  });
};
export default signin;
