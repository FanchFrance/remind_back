const express = require("express");
const app = express();
const api = require("./routes");
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

app.listen(port, (err) => {
  if (err) {
    throw new Error("There is an error");
  }
  console.log(`Port ${port}`);
});
