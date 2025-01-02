const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyparse = require("body-parser");
const hbs = require("hbs");
const multer = require("multer");
const { engine } = require("express-handlebars");
const path = require("path");
const publicfilepath = path.join(__dirname, "../public");
const partialspath = path.join(__dirname, "../public/partials");

const homeroute = require("./routes/homeroute");
const adminrotue = require("./routes/adminroute");
app.use(bodyparse.urlencoded({ extend: true }));
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form-encoded data

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: path.join(__dirname, "../views"),
    partialsDir: partialspath,
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(publicfilepath));

app.use(homeroute);
app.use(adminrotue);

app.listen(port, () => {
  console.log("Working");
});
