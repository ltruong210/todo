var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

// LANDING ROUTE
router.get("/", function(req, res) {
    if(req.isAuthenticated()) {
        res.redirect("/" + req.user._id);
    } else {
        res.redirect("/login");
    }
})

// RENDER REGISTER FORM
router.get("/register", function(req, res) {
    res.render("register");
});

// HANDLER REGISTER LOGIC
router.post("/register", function(req, res) {
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })
    User.register(newUser, req.body.password, function(err, user) {
        if(err || !user) {
            req.flash();
            return res.render("register", {error:  err.message});
        } 
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Todo " + user.firstName);
            res.redirect("/" + user._id);
        });
    });
});

// LOGIN FORM
router.get("/login", function(req, res) {
    res.render("login");
})

// HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: "Welcome to Todo",
        failureFlash: "Invalid username or password"
    }), function(req, res) {
});

// HANDLE LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "See you later!");
    res.redirect("/login");
});
module.exports = router;
