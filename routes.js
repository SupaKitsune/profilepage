var express = require("express")
var user = require("./models/user")
var router = express.Router()

router.use(function(request, response, next){
	response.locals.currentUser = request.user;
	response.locals.errors = request.flash("error");
	response.locals.info = request.flash("info");
	next()
})

router.get("/", function(request, response, next){
	user.find().sort({createdAt:"descending"}).exec(function(err, users){
		if(err)return next(err);
		
		response.render("index", {users:users})
	})
})

module.exports = router;