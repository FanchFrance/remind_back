const express = require("express");
const patients = require("./patients");

const router = express.Router();

router.use("/patients", patients);

module.exports = router;
