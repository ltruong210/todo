var bodyParser  = require("body-parser"),
    express     = require("express"),
    app         = express(),
    mongoose    = require("mongoose"),
    methodOverride = require("method-override"),
    session = require("express-session"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    flash        = require("connect-flash");

// IMPORT MODELS
var User = require("./models/user");
var Todo = require("./models/todo");

// DATABASE CONFIG
var databaseUrl = process.env.DATABASEURL || "mongodb://localhost:/todo";
mongoose.connect(databaseUrl);

// MISCELLANEOUS
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "It is a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
 });

// ROUTES CONFIG
var todoRoutes    = require("./routes/todos"),
    indexRoutes      = require("./routes/index");
app.use("/", indexRoutes);
app.use("/", todoRoutes);

// LISTEN TO PORT
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started");
});