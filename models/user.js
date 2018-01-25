var bcrypt = require("bcrypt-nodejs")
var mongoose = require("mongoose")

var SALT_FACTOR = 10//Fox - testing to see if I need a ';' here

var userSchema = mongoose.Schema({
	username:{type:String, required:true, unique:true},
	password:{type:String, required:true},
	createdAt:{type:Date, default:Date.now},
	displayName:String,
	bio:String
})

//noop means "no operation" and is t do nothing function that bcrypt needs
var noop = function(){}

userSchema.pre("save", function(done){
	var user = this;
	if (!user.isModified("password")){
		return done();
	}
	bcrypt.genSalt(SALT_FACTOR, function(err, salt){
		if (err){
			return done(err);
		}
		bcrypt.hash(user.password, salt, noop, function(err, hashedPassword){
			if (err) return done(err);
			
			user.password = hashedPassword;
			done()
		})
	})
})

userSchema.methods.checkPassword = function(guess, done){
	bcrypt.compare(guess, this.password, function(err, matches){
		done(err, matched)
	})
}

userSchema.methods.name = function(){
	return this.displayName || this.username;
}

userSchema.methods.name_true = function(){
	return this.username;
}

var User = mongoose.model("User", userSchema);//Fox - test if we need a ';' here

module.exports = User;