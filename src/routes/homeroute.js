const express = require("express");
const app = express();
const route = new express.Router();
const fs = require("fs");
const path = require("path");

// const route = app.route();

route.get("/", (req, res) => {
  res.render("index", {
    adminstatus: "customer",
  });
});

//  BANNER IS COMMONN FOR EVERY DEPARTMENT STUDENTS ---
route.post("/banner-append", (req, res) => {
  fs.readFile("./slidefile.json", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading file");
    } else {
      const maindata = JSON.parse(data);
      res.json({ bannerarray: maindata });
    }
  });
});

module.exports = route;
