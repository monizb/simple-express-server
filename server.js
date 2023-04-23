var express = require('express');
var bodyParser = require('body-parser');
var app = express();
let {PythonShell} = require('python-shell')
const {spawn} = require("child_process");
const axios = require('axios');

//Allow all requests from all domains & localhost
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/scrape-reviews', async function(req, res) {
    res.status(200).send("Scraping reviews...");
    PythonShell.run('review_scraper.py', null).then(messages=>{
        console.log(messages);
    });
});

app.get('/company', async function(req, res) {
    const companies = await axios.get(
        "https://www.glassdoor.co.in/searchsuggest/typeahead?version=New&rf=full&input=tata",
        {
          headers: {
            ["User-Agent"]: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:79.0) Gecko/20100101 Firefox/79.0",
          },
        }
      );
    res.status(200).send(companies.data);
});

app.listen(process.env.PORT || 3000);
