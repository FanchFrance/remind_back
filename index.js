const express = require("express");
const apiRouter = require("./routes");
const port = 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.listen(port, (err) => {
  console.log("server is running, listening on port");
});
