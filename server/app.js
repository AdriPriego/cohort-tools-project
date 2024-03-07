const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;



// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const cors = require("cors");

require("./db")

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(cors("http://localhost:5173"));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
const indexRoutes = require("./routes/index.routes")
app.use("/api", indexRoutes)

//Error Handling
//Error 404
app.use((req, res, next) => {
  res.status(404).json({ErrorMessage: "La ruta no ha sido encontrada"})
})

//Error 500
app.use((error, req, res, next) => {
  res.status(500).json({ErrorMessage: "Servidor petado"})
})

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
