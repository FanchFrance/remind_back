const express = require("express");
const router = express.Router();
const connection = require("../config");

//Retrieve all the symptoms
router.get("/", (req, res) => {
  connection.query("SELECT * FROM symptom", (err, results) => {
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

//Retrieve one symptom
router.get("/:id", (req, res) => {
  const idParams = req.params.id;

  connection.query(
    "SELECT * FROM symptom WHERE id = ?",
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

// Retrieve all prises form one symptom
router.get("/:id/prises", (req, res) => {
  const idParams = id.params.id;
  connection.query("SELECT * FROM symptom JOIN prise ON ");
});

//Create a symptom
router.post("/", (req, res) => {
  const formData = req.body;
  connection.query("INSERT INTO symptom SET ? ", [formData], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

//Delete a symptom
router.delete("/:id", (req, res) => {
  const idParams = req.params.id;
  connection.query(
    "DELETE FROM symptom WHERE id = ?",
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
