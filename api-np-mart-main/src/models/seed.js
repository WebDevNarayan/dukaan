import mongoose from "mongoose";
import argon2 from "argon2";
import User from "./User";

const seedData = async () => {
  const url = "mongodb://localhost:27017/dukaan";
  // await mongoose.connect(process.env.DB_URL + "/dukaan");
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected To The DB");
    })
    .catch((err) => {
      console.log("Error Connecting To DB");
    });

  const password = await argon2.hash("admin");

  const seedDB = async () => {
    const user = new User({
      name: "admin",
      email: "admin@gmail.com",
      password,
      role: "admin",
    });
    await user.save();
  };
  seedDB().then(() => {
    mongoose.connection.close();
    console.log("DB Seeding Successful");
  });
};

seedData();
