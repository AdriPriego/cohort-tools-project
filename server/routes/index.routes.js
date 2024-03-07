const express = require("express");
const router = express.Router();

const Student = require("../models/Student.model");
const Cohort = require("../models/Cohort.model");

const cohorts = require("../cohorts.json");
const students = require("../students.json");

router.get("/docs", (req, res, next) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//students routes

// Ruta crear estudiante
router.post("/students", (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body;

  Student.create({
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  })
    .then(() => {
      res.status(201).json()
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

//Ruta todos los estudiantes
router.get("/students", (req, res, next) => {
  Student.find()
    .populate("cohort")
    .then((student) => {
      console.log("todos los estudiantes", student);
      res.status(200).json(student);
    })
    .catch((error) => {
      console.log("error", error);
      next(error);
    });
});

//Ruta todos los estudiantes para un cohort especifico
router.get("/students/cohort/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  console.log(req.params.cohortId);

  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((student) => {
      console.log("todos los estudiantes del cohort", student);
      res.status(200).json(student);
    })
    .catch((error) => {
      console.log("error", error);
      next(error);
    });
});

//Ruta para un estudiante especifico por id
router.get("/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  console.log(studentId);
  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log("Estudiante", student);
      res.status(200).json(student);
    })
    .catch((error) => {
      console.log("error", error);
      next(error);
    });
});

//Ruta para editar un estudiante especifico por id
router.put("/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  console.log(studentId);
  const {
    firstName,
    lastName,
    email,
    phone,
    linkedinUrl,
    languages,
    program,
    background,
    image,
    cohort,
    projects,
  } = req.body;
  Student.findByIdAndUpdate(
    studentId,
    {
      firstName,
      lastName,
      email,
      phone,
      linkedinUrl,
      languages,
      program,
      background,
      image,
      cohort,
      projects,
    },
    { new: true }
  )
    .then((student) => {
      console.log("Estudiante", student);
      res.status(202).json(student)
    })
    .catch((error) => {
      console.log("error", error);
      next(error);
    });
});

//Ruta para borrar un estudiante
router.delete("/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  console.log(studentId);
  Student.findByIdAndDelete(studentId)
    .then((student) => {
      console.log("Estudiante borrado", student);
      res.status(202).json({message: "Estudiante borrado"})
    })
    .catch((error) => {
      console.log("error", error);
      next(error);
    });
});

//cohorts rutes

//Ruta para crear un cohort
router.post("/cohorts", (req, res, next) => {
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;

  Cohort.create({
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  })
    .then(() => {
      res.status(201).json()
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

//Ruta todos los cohorts
router.get("/cohorts", (req, res, next) => {
  Cohort.find()
    .then((cohort) => {
      console.log("todos los cohorts", cohort);
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.log("error", error);
      next(error);
    });
});

//Ruta para un cohort especifico por id
router.get("/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  console.log(cohortId);
  Cohort.findById(cohortId)
    .then((cohort) => {
      console.log("Estudiante", cohort);
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.log("error", error);
      next(error);
    });
});

//Ruta para editar un cohort especifico por id
router.put("/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  console.log(cohortId);
  const {
    inProgress,
    cohortSlug,
    cohortName,
    program,
    campus,
    startDate,
    endDate,
    programManager,
    leadTeacher,
    totalHours,
  } = req.body;
  Cohort.findByIdAndUpdate(
    cohortId,
    {
      inProgress,
      cohortSlug,
      cohortName,
      program,
      campus,
      startDate,
      endDate,
      programManager,
      leadTeacher,
      totalHours,
    },
    { new: true }
  )
    .then((cohort) => {
      console.log("Estudiante", cohort);
      res.status(202).json(cohort)
    })
    .catch((error) => {
      console.log("error", error);
      next(error);
    });
});

//Ruta para borrar un cohort
router.delete("/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  console.log(cohortId);
  Cohort.findByIdAndDelete(cohortId)
    .then((cohort) => {
      console.log("Cohort borrado", cohort);
      res.status(202).json({message: "Cohort borrado"})
    })
    .catch((error) => {
      console.log("error", error);
      next(error);
    });
});

module.exports = router;
