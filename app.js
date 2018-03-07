var express = require("express");

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var session = require("express-session");
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:"noOneWillGuessThis"}));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static("public"));

app.get("/", function(req,res) {
    var context = {}
    if (!req.session.name){
        res.render("newSession", context)
        return
    }
    context.name = req.session.name;
    res.render('home',  context) 
});

app.post("/", function(req,res) {
    var context = {};
    if(req.body['rpsgame']) {
        req.session.name = req.body.name;
    }
    context.name = req.session.name;
    res.render('home', context)
});

//start server
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started");
})