const express = require("express");
const cors = require("cors");
const Sequelize = require("./utils/db");

const app = express();
app.use(express.json());
app.use("/", require("./routes/route.js"));

app.use((err, red, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
});

Sequelize.sync()
  .then(() => {
    console.log("database connected");
    app.listen(3000);
    console.log("app is listening on http://localhost:3000");
  })
  .catch((err) => {
    console.log(err);
  });
