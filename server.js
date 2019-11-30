// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


const router = express.Router();
router.get("/weather/:city", function(req, res) {
    const citywet = [
        { city: 'Houston', wet: 73 },
        { city: 'Philadelphia', wet: 53 },
        { city: 'Dallas', wet: 70 }

    ];

    const city = req.params.city;

    const wet = citywet.filter(x => x.city === city);
    let temp = 73;
    if (wet.length !== 0) {
        temp = wet[0].wet;
    }
    res.send({ wet: temp });
});
router.get("/zipcode/:zip", function(req, res) {
    console.log('in zipcode')
    const zipwet = [
        { zip: 63101, wet: 53 },
        { zip: 90210, wet: 63 },
        { zip: 01010, wet: 48 }
    ];
    console.log('params is ', req.params);
    const zip = req.params.zip;
    console.log('zipwet is ', zipwet);
    console.log('zip is ', zip);
    const wet = zipwet.filter(x => String(x.zip) === zip);
    console.log('wet is  ', wet);
    let temp;
    if (wet.length === 0) {
        temp = 70;
    } else {
        temp = wet[0].wet;
    }
    res.send({ wet: temp });
});
app.use(router);
// Setup Server
app.listen(8080, (e) => {
    console.log("listening on port 8080");
    console.log(e);
});