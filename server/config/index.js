const morgan = require("morgan");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = (app) => {
    app.use(cors("http://localhost:5173"));
    app.use(express.json());
    app.use(morgan("dev"));
    app.use(express.static("public"));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
}