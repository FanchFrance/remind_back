const express = require("express");
const router = express.Router();
const connection = require("../config");

//Retrieve all drugs
router.get("/", (req, res) => {
  connection.query("SELECT * FROM drug", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(result);
    }
  });
});

//Retrieve a drug
router.get("/:id", (req, res) => {
  const idParams = req.params.id;

  connection.query(
    "SELECT * FROM drug WHERE id = ?",
    [idParams],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

//Create a drug
router.post("/", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO drug SET ?", [formData], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

//Update a drug
router.put("/:id", (req, res) => {
  const idParams = req.params.id;
  const formData = req.body;

  connection.query(
    "UPDATE drug SET ? WHERE id = ?",
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

//Delete a drug
router.delete("/:id", (req, res) => {
  const idParams = req.params.id;
  connection.query(
    "DELETE FROM drug WHERE id = ?",
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
