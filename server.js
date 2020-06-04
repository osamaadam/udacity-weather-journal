const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

app.use(express.static("public"));

const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

let projectData = [
  {
    date: Date.now(),
    temp: "over 9000",
    content: "nothing entered yet, this is a placeholder!",
    placeholder: true
  }
];

app.get("/all", (req, res) => {
  res.json(projectData);
});

app.get("/recent", (req, res) => {
  if (projectData) res.json(projectData[projectData.length - 1]);
  else res.status(404).json("projectData is empty");
});

app.post("/data", (req, res) => {
  if (projectData.length === 1 && projectData.placeholder) projectData[0] = req.body;
  else projectData.push(req.body);
  res.json("data received");
});
