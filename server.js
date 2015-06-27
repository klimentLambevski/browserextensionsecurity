var express = require('express');
var https = require('https');
var http = require('http');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
// in latest body-parser use like bellow.
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/storeinfo', function (req, res) {
    console.log(req.body);
    res.send('Hello World!');
});

app.post('/storehistory', function (req, res) {
    console.log(req.body);
    res.send('Hello World!');
});

app.post('/storebookmarks', function (req, res) {
    console.log(req.body);
    res.send('Hello World!');
});

var privateKey = fs.readFileSync( 'certs/key.pem' );
var certificate = fs.readFileSync( 'certs/cert.pem' );

https.createServer({
    key: privateKey,
    cert: certificate
}, app).listen(443);
http.createServer(app).listen(3000);
