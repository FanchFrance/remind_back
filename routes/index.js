const express = require("express");
const patients = require("./patients");
const doctors = require("./doctors");
const drugs = require("./drugs");
const prises = require("./prises");

const router = express.Router();

router.use("/patients", patients);
router.use("/doctors", doctors);
router.use("/drugs", drugs);
router.use("./prises", prises);

module.exports = router;
