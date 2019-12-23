const jsonServer = require('json-server');
var bodyParser = require('body-parser');
const css = require('../demoServer/style');
const fs = require("fs");
const express = require('express');
const path = require('path');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();
app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// app.use(express.static(path.join(__dirname, "../templateapp/dist/templateapp")));
app.get('/', (req, res) => {
   // res.sendfile(path.join(__dirname, "../templateapp/dist/templateapp/index.html"));
   res.end("Hello World");
});
var template_start = `<!DOCTYPE html>
<html>
<head>
   <meta name="viewport" content="width=device-width, initial-scale=1">` + css.style + ` <body>`;

var template_end = `</body>
</html>`;

app.post("/html", (req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    console.log(req.body.html);
    const template = req.body.html;
    const html = template_start + template + template_end;
    fs.writeFile("temp.html", html, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });

    res.end(JSON.stringify(html, null, 2))
});

app.get("/html/download", (req, res) => {
    res.sendfile(__dirname + '/temp.html');

});

app.get("/html/welcome", (req, res) => {
    res.sendfile(__dirname + '/welcomeScreen.html');

});

app.use(router)
app.listen(8080, () => {
    console.log('JSON Server is up and running')
})