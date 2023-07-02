import mongoose from "mongoose";

//Connecting to database
const Connection= async(uri)=>{

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('DB Connected');
    })
    .catch((error) => {
      console.error('Error connecting to the database:', error);
    });

    mongoose.connection.on('error', (error) => {
      console.error('Database connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from the database');
    });
}

export default Connection;