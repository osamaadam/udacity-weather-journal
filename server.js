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

let projectData = {
  date: Date.now(),
  temp: "over 9000",
  content: "nothing entered yet, this is a placeholder!"
};

app.get("/recent", (req, res) => {
  res.json(projectData);
});

app.post("/data", (req, res) => {
  projectData = req.body;
  res.json("data received");
});
