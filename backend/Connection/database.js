const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose.set("strictQuery", false);
  try {
    mongoose
      .connect("mongodb://127.0.0.1:27017/MiniReact", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
     
      .then(() => {
        console.log("Database connected successfully");
      })
      .catch((err) => {
        console.log("Database error", err.message);
      });
  } catch (error) {
    console.log("Database error", error);
  }
};

module.exports = dbConnection;