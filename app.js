var express = require("express")
var mongoose = require("mongoose")
var path = require("path")
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var session = require("express-session")
var flash = require("connect-flash")
var routes = require("./routes")

var app = express()

mongoose.connect("mongodb://localHost:27017/test")//using the test database

app.set("port", process.env.PORT || 3000)
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

//use middlewear
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
app.use(session({
	secret:"CAFEBABE",//can be any string data
	resave:true,
	saveUninitialized:true
}))

app.use(flash())
app.use(routes)

app.listen(app.get("port"), function(){
	console.log("server started on port " + app.get("port"))
})