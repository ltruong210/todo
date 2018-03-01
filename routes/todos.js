var express = require("express");
var router = express("router");
var Todo = require("../models/todo");
var User = require("../models/user");
var middleware = require("../middleware/index");



router.get("/:id",middleware.isLoggedIn, function(req, res) {
    User.findById(req.params.id).populate({path: "todos", model: "Todo"}).exec(function(err, foundUser) {
        if(err || !foundUser) {
            console.log(err);
            return res.redirect("/todos");
        } 
        console.log(foundUser);
        res.render("todos/index", {user: foundUser});
    });
});

// NEW ROUTE
router.get("/:id/new", middleware.isLoggedIn, function(req, res) {
    res.render("todos/new");
});

// CREATE ROUTE
router.post("/:id", middleware.isLoggedIn, function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err || !foundUser) {
            console.log(err);
            res.redirect("/"+ user._id);
        } else {
            Todo.create(req.body.todo, function(err, todo) {
                if(err) {
                    console.log(err);
                } else {
                    user.todos.push(todo._id);
                    user.save();
                    res.redirect('/'+user._id);
                }
            });
        }
    });
});

module.exports = router;