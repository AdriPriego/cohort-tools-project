const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require("mongoose")
const Student = require("./models/Student.model")
const Cohort = require("./models/Cohort.model")

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts = require("./cohorts.json");
const students = require("./students.json");

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const cors = require("cors");


mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch(err => console.error("Error connecting to MongoDB", err));

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(
  cors(
    "http://localhost:5173"
  )
);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find()
    .then((cohorts) => {
      console.log("todos los cohorts", cohorts)
      res.json(cohorts);
    })
    .catch((error) => {
      console.log("error", error)
      res.status(500).json({ error: "fallo al recibir los cohorts" })
    })
});
//students routes

// Ruta crear estudiante
app.post("/api/students", (req, res, next) => {
  const {firstName, lastName, email, phone, linkedinUrl, languages, program, background, image, cohort, projects} = req.body

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
    projects
  })
  .then((response) => {
    res.json({message: "estudante creado"})
  })
  .catch((error) => {
    console.log(error)
  })
})
//Ruta todos los estudiantes
app.get("/api/students", (req, res) => {
  Student.find()
    .then((students) => {
      console.log("todos los estudiantes", students)
      res.json(students);
    })
    .catch((error) => {
      console.log("error", error)
      res.status(500).json({ error: "fallo al recibir los estudiantes" })
    })
});
//Ruta todos los estudiantes para un cohort especifico
app.get("/api/students/cohort/:cohortId", (req, res) => {
  console.log(req.params.cohortId)
  Student.find({cohortId})
    .then((students) => {
      console.log("todos los estudiantes del cohort", students)
      res.json(students);
    })
    .catch((error) => {
      console.log("error", error)
      res.status(500).json({ error: "fallo al recibir los estudiantes" })
    })
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
