// import { Octokit } from "@octokit/rest";

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

async function initializeOctokit() {
  const { Octokit } = await import("@octokit/rest");
  return new Octokit({
    // auth: "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", // Replace with your PAT
    auth: process.env.GITHUB_TOKEN, // Replace with your PAT
  });
}

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

// const pdfFolder = path.resolve(__dirname, "../../public/slidepdf");
// const jsonFilePath = path.join(__dirname, "../slidefile.json");

const jsonFilePath = path.join(__dirname, "../slidefile.json");
const pdfFolder = path.resolve(__dirname, "../../public/slidepdf");
const jsondata = fs.readFileSync(jsonFilePath, "utf-8");

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

// const jsonFilePath = path.resolve(__dirname, "../slidefile.json");

route.get("/update-repo", async (req, res) => {
  try {
    const octokit = await initializeOctokit();

    const owner = "arifalam5841"; // Replace with your GitHub username
    const repo = "ndmath"; // Your repository name
    const filePath = "slidefile.json";

    const updatedContent = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: "main",
    });

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: "Update slidedata.json",
      content: Buffer.from(JSON.stringify(updatedContent, null, 2)).toString(
        "base64"
      ),
      sha: fileData.sha, // Required to update the file
    });
    console.log(
      "GitHub API URL:",
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`
    );

    res.status(200).send("Data saved and pushed to GitHub successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating GitHub file.");
  }
});

// heloooooo

route.get("/fileupdated", (req, res) => {
  res.render("index");
});
module.exports = route;
