const { query } = require("express");
const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;
  //verificar si existe el email
  pool.query(queries.chekEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Este email ya esta registrado");
    }

    //agregando estudiantes
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("El estudiante ha sido agregado");
      }
    );
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("El estudiante no exite, por lo que no puede ser borrrado");
    } else {
      pool.query(queries.removeStudent, [id], (error, results) => {
        if (error) throw error;
        res.status(200).send("El estudiante ha sido eliminado");
      });
    }
  });
};

const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  pool.query(queries.getStudentById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) {
      res.send("El estudiante no exite");
    } else {
      pool.query(queries.updateStudent, [name], (error, results) => {
        if (error) throw error;
        res.status(200).send("El estudiante fue editado");
      });
    }
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
