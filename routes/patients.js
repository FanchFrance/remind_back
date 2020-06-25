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

//Retrieve one patient
router.get("/:id", (req, res) => {
  const idParams = req.params.id;

  connection.query(
    "SELECT * FROM patient WHERE id = ?",
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

// Création de prise de médicament
router.post("/:idPatient/drugs/:idDrug", (req, res) => {
  const idPatient = req.params.idPatient;
  const idDrug = req.params.idDrug;

  const formData = req.body;

  connection.query(
    "INSERT INTO patient_drug SET ? ",
    [formData, idPatient, idDrug],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.sendStatus(201);
      }
    }
  );
});

// Récupérer toutes les prises d'un patient
router.get("/:idPatient/drugs/:idDrug", (req, res) => {
  const idPatient = req.params.idPatient;
  const idDrug = req.params.idDrug;

  connection.query(
    "SELECT * FROM patient_drug AS pd JOIN drug AS d ON pd.drug_id = d.id JOIN patient AS p ON pd.patient_id = p.id WHERE p.id = pd.patient_id AND d.id = pd.drug_id",
    [idPatient, idDrug],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// modifier un traitement pour un patient
router.put("/:idPatient/treatment/", (req, res) => {
  const idPatient = req.params.idPatient;
  const formData = req.body;

  connection.query(
    "UPDATE patient_drug SET ? WHERE patient_id = ?",
    [formData, idPatient],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(204).json(result);
      }
    }
  );
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
