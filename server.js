const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const serverConfig = require("./configs/server.config");
const User = require("./models/user.model");

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL);
mongoose.set("strictQuery", false);

const db = mongoose.connection;
db.on("error", () => {
  console.log("Error while connected to mongodb");
});

db.once("open", async () => {
  await User.collection.drop();
  console.log("connected to mongodb");
});

require("./routes/users.route")(app);

app.listen(serverConfig.PORT, () => {
  console.log("Started the server on the PORT number :", serverConfig.PORT);
});
