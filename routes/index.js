const express = require("express");
const patients = require("./patients");
const doctors = require("./doctors");
const drugs = require("./drugs");
const prises = require("./prises");
const symptoms = require("./symptoms");

const router = express.Router();

router.use("/patients", patients);
router.use("/doctors", doctors);
router.use("/drugs", drugs);
router.use("./prises", prises);
router.use("./symptoms", symptoms);

module.exports = router;
