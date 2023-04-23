var express = require('express');
var bodyParser = require('body-parser');
var app = express();
let {PythonShell} = require('python-shell')
const {spawn} = require("child_process");
const axios = require('axios');
const fetch = require('node-fetch');

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
    // const companies = await axios.get(
    //     "https://www.glassdoor.co.in/searchsuggest/typeahead?version=New&rf=full&input=tata",
    //     {
    //       headers: {
    //         ["User-Agent"]: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:79.0) Gecko/20100101 Firefox/79.0",
    //       },
    //     }
    //   );
      fetch("https://www.glassdoor.co.in/api-web/employer/find.htm?autocomplete=true&maxEmployersForAutocomplete=10&term=info&gdToken=j_UGvT5FZygwaQHA999H9w:qIp6cPGBGQs2RDI4y5jEmkmRzVbo1Jyl10U3BcNnlHpk2NbPu1Sz9_JaUVCD2SqeDHlyX_G1v1rCoT_Fw8OHIQ:kc9Cu4MBqsKmW2jhHSR2DIeXMylSRBLeVX9ZXd3WYTs", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/110.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Alt-Used": "www.glassdoor.co.in",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
    },
    "referrer": "https://www.glassdoor.co.in/",
    "method": "GET",
    "mode": "cors"
}).then(response => console.log(response));
    // res.status(200).send(companies);
});


app.post('/scrape-company', async function(req, res) {
    PythonShell.run('scripts/company-getter.py', {
        args: [req.body.company]
    }).then(messages=>{
        res.status(200).send(JSON.parse(messages[0]));
    });
});

app.listen(process.env.PORT || 3000);
