const express = require("express");
const app = express();
const route = new express.Router();
const fs = require("fs");
const path = require("path");

// const route = app.route();

// "/admin" - at the place of admin we should put a code so that no one can access that page except admin
// example - "/7865" or "/nd4521" etc
route.get("/admin", (req, res) => {
  res.render("adminpage");
});

module.exports = route;
