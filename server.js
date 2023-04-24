var express = require("express");
var bodyParser = require("body-parser");
var app = express();
let { PythonShell } = require("python-shell");
const axios = require("axios");

//Allow all requests from all domains & localhost
app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/scrape-reviews", async function (req, res) {
  res.status(200).send("Scraping reviews...");
  PythonShell.run("review_scraper.py", null).then((messages) => {
    console.log(messages);
  });
});

app.post("/scrape-company", async function (req, res) {
  PythonShell.run("scripts/company-getter.py", {
    args: [req.body.company],
  }).then((messages) => {
    res.status(200).send(JSON.parse(messages[0]));
  });
});

app.post("/scrape-company-metadata", async function (req, res) {
  res.status(200).send("Scraping company metadata...");
  PythonShell.run("review_scraper.py", {
    args: [req.body.name, req.body.id],
  }).then((reviews) => {
    PythonShell.run("scripts/interview_scraper.py", {
      args: [req.body.name, req.body.id],
    }).then((questions) => {
        questions = questions.filter(function(item) {
            return item !== "\r"
        })
        axios.post("https://placementdevapi.techstax.co/api/util/add-company-scraped-data", {
            name: req.body.name,
            id: req.body.id,
            reviews: reviews,
            questions: questions
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    });
  });
});

app.listen(process.env.PORT || 3001);
