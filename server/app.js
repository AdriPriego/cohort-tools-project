require("dotenv").config()
const express = require("express");
const app = express();
const PORT = 5005;



// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express


require("./db")

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
require("./config")(app)

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
const indexRoutes = require("./routes/index.routes")
app.use("/api", indexRoutes)

require("./error-handling")(app)

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
