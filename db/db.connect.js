const mongoose = require("mongoose")
require("dotenv").config()

const mongooseUri = process.env.MONGODB

const initializeDB = async () => {
  await mongoose
.connect(mongooseUri)
.then(() => console.log("Connected to Database"))
.catch((error) => console.log("Error connecting to Database", error))
}

module.exports = { initializeDB }