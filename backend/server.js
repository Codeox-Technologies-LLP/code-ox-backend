const app = require("./app");
const dotenv = require("dotenv");
const path = require("path");
const dotenvConfig = dotenv.config({
  path: path.resolve(__dirname, "./config", "config.env"),
});

const mongoose = require("mongoose");
console.log(process.env.MONGO);
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected");
    app.listen(process.env.PORT, () => {
      console.log(`server connected at ${process.env.PORT}`);
    });
  });
