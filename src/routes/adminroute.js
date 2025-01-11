const { json } = require("body-parser");
const express = require("express");
const app = express();
const route = new express.Router();
const fs = require("fs-extra");
const multer = require("multer");
const path = require("path");
const simpleGit = require("simple-git");
const git = simpleGit();
const { exec } = require("child_process");

// THIS IS FOR GETING THE CODE OF EACH ELEMENT IN THE PAGE TO REMOVE THE ELEMENT
route.get("/admin-code", (req, res) => {
  res.render("index", {
    adminstatus: "admin",
  });
});

// "/admin" - at the place of admin we should put a code so that no one can access that page except admin
// example - "/7865" or "/nd4521" etc
route.get("/admin", (req, res) => {
  res.render("adminpage", {
    adminstatus: "admin",
  });
});

const bannerbgstore = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../public/slideimg");
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const bannerpdfstore = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../public/slidepdf");
  },

  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      if (file.fieldname === "bgimage") {
        cb(null, "../public/slideimg");
      } else if (file.fieldname === "slidepdf") {
        cb(null, "../public/slidepdf");
      }
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: function (req, file, cb) {
    if (file.fieldname === "slidepdf" && file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed for slidefile."));
    }
    cb(null, true);
  },
});

const uploadFields = upload.fields([
  { name: "bgimage", maxCount: 1 },
  { name: "slidepdf", maxCount: 1 },
]);

const pdfFolder = path.resolve(__dirname, "../../public/slidepdf");
const jsonFilePath = path.join(__dirname, "../slidefile.json");
console.log(pdfFolder);
console.log(jsonFilePath);
route.post("/addingslide", uploadFields, async (req, res) => {
  const { slidehead, discription, degdip, branch } = req.body;

  const poster = req.files["bgimage"] ? req.files["bgimage"][0].filename : null;
  const postes = req.files["bgimage"] ? req.files["bgimage"][0].size : null;

  console.log(postes);
  const pdfFile = req.files["slidepdf"]
    ? req.files["slidepdf"][0].filename
    : null;
  // const poster = req.file ? req.file.filename : null;
  // const pdfFile = req.file ? req.file.filename : null;

  try {
    console.log(slidehead, discription);
    console.log(poster);
    console.log(pdfFile);

    const randomNumber1 = Math.floor(Math.random() * 10);
    const randomNumber2 = Math.floor(Math.random() * 10);
    const randomNumber3 = Math.floor(Math.random() * 10);
    const randomNumber4 = Math.floor(Math.random() * 10);
    const finalcode =
      randomNumber1.toString() +
      randomNumber2.toString() +
      randomNumber3.toString() +
      randomNumber4.toString();
    const newdata = {
      imgSrc: poster,
      title: slidehead,
      description: discription,
      type: degdip,
      branch: branch,
      year: degdip,
      elementcode: finalcode,
      link: pdfFile,
    };

    const jsondata = fs.readFileSync("slidefile.json", "utf-8");

    const arraydata = JSON.parse(jsondata);
    arraydata.push(newdata);

    console.log(newdata);
    console.log(jsondata);
    console.log(arraydata);

    const finaldata = JSON.stringify(arraydata);
    // fs.writeFileSync("slidefile.json", finaldata);
    fs.writeFileSync("slidefile.json", finaldata);

    const pdfFilePath = path.join(pdfFolder, pdfFile);

    res.redirect("/fileupdated");
  } catch (error) {
    console.log(error);
  }
});

route.get("/update-repo", (req, res) => {
  const privateKey = process.env.SSH_PRIVATE_KEY;

  if (!privateKey) {
    console.error("SSH_PRIVATE_KEY is not set.");
    return res.status(500).send("SSH key is not configured.");
  }

  // Adjusted repo and script paths based on your folder structure
  const repoPath = path.join(__dirname, "../../"); // Root directory (NDMATH)
  const scriptPath = path.join(repoPath, "update_repo.sh");

  const setupSSHCommand = `
    mkdir -p ~/.ssh &&
    echo "${privateKey}" > ~/.ssh/id_rsa &&
    chmod 600 ~/.ssh/id_rsa &&
    ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
  `;

  const updateCommand = `
    ${setupSSHCommand} &&
    bash ${scriptPath}
  `;

  exec(updateCommand, { cwd: repoPath }, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return res.status(500).send("Failed to update repository");
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send("Repository updated successfully");
  });
});
// heloooooo

route.get("/fileupdated", (req, res) => {
  res.render("index");
});
module.exports = route;
