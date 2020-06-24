const express = require("express");
const router = express.Router();
const connection = require("../config");

//Retrieve all doctors
router.get("/", (req, res) => {
  connection.query("SELECT * FROM doctor", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//Create a doctor
router.post("/", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO doctor SET ?", [formData], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

//Update a doctor
router.put("/:id", (req, res) => {
  const idParams = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE doctor SET ? WHERE id = ?",
    [formData, idParams],
    (err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

//Delete a doctor
router.delete("/:id", (req, res) => {
  const idParams = req.params.id;
  connection.query(
    "DELETE FROM doctor WHERE id = ?",
    [idParams],
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
