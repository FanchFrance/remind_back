const express = require("express");
const router = express.Router();
const connection = require("../config");

//Retrieve all the patients
router.get("/", (req, res) => {
  connection.query("SELECT * FROM patient", (err, results) => {
    if (err) {
      return res.status(500).json({
        error: err.message,
        sql: err.sql,
      });
    } else {
      res.status(200).json(results);
    }
  });
});

//Create a patient
router.post("/", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO patient SET ? ", [formData], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

//Delete a patient
router.delete("/:id", (req, res) => {
  const idParams = req.params.id;
  connection.query(
    "DELETE FROM patient WHERE id = ?",
    idParams,
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
