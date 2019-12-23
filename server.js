// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
const http = require('http');
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
const api = '4f1dc020feb035971c309f2a30e0f383';
const baseurl = 'http://api.openweathermap.org/data/2.5/weather?q=#location#&APPID=';

const router = express.Router();

function getdata(url, res) {
    var Request = require("request");

    Request.get({
        "headers": {
            "content-type": "application/json"
        },
        "url": url
    }, (error, response, body) => {
        var mess;
        console.log('getting data ', body);
        if (error) {
            mess = JSON.strzingify({
                success: false,
                error: 'error'
            });
            console.log(error);
            res.send(mess);
        }
        try {
            body = JSON.parse(body);
            const datasendback = {
                temp: body.main.temp,
                feel: 'great post',
                date: body.sys.sunrise
            }
            mess = JSON.stringify(datasendback);
            res.send(mess);
        } catch (err) {
            mess = JSON.stringify({
                success: false,
                error: 'error'
            });
            res.send(mess);
        }

    });
}
router.post('/', async (req, res) => {
    console.log('res body ', req.body);
    if (!req.body.zip) {
        console.log("no zip defind")
        res.send('system error');
        return;
    }
    const url = baseurl.replace('#location#', req.body.zip) + api;

    console.log('url ', url);
    getdata(url, res);

});
router.get('/all/:loc/:content/:apikey', async function (req, res) {
    let data;
    console.log('params ', req.params);

    var Request = require("request");

    Request.get({
        "headers": {
            "content-type": "application/json"
        },
        "url": baseurl.replace('#location#', req.params.loc) + req.params.apikey
    }, (error, response, body) => {
        if (error) {

            res.send({
                success: false,
                error: 'error'
            });
            return console.log(error);
        }
        console.log('obdy is ', body);
        try {
            body = JSON.parse(body);
            const datasendback = {
                temp: body.main.temp,
                feel: req.params.content,
                date: body.sys.sunrise
            }
            res.send(JSON.stringify(datasendback));
            return;
        } catch (err) {
            res.send({
                success: false,
                error: 'error'
            });
            return;
        }

    });


    // console.log('data is '  , data);
});
router.get("/weather/:city", function (req, res) {
    const citywet = [{
            city: 'Houston',
            wet: 73
        },
        {
            city: 'Philadelphia',
            wet: 53
        },
        {
            city: 'Dallas',
            wet: 70
        }

    ];

    const city = req.params.city;

    const wet = citywet.filter(x => x.city === city);
    let temp = 73;
    if (wet.length !== 0) {
        temp = wet[0].wet;
    }
    res.send({
        wet: temp
    });
});
router.get("/zipcode/:zip", function (req, res) {
    console.log('in zipcode')
    const zipwet = [{
            zip: 63101,
            wet: 53
        },
        {
            zip: 90210,
            wet: 63
        },
        {
            zip: 01010,
            wet: 48
        }
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
    res.send({
        wet: temp
    });
});
app.use(router);
// Setup Server
app.listen(8080, (e) => {
    console.log("listening on port 8080");
    console.log(e);
});