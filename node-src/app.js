var express = require('express');

var app = express();
var multer = require('multer')
var constants = require('constants');
// var constant = require('./config/constants');
const expressip = require('express-ip');
var csrf = require('csurf');
var cors = require('cors')
app.use(cors())

var port = process.env.PORT || 8042;

var flash = require('connect-flash');
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var now = new Date();

const redis = require('redis');
var redisStore = require('connect-redis')(session);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressip().getIpInfoMiddleware);
app.use(cookieParser()); // read cookies (needed for auth)
//app.use(bodyParser()); // get information from html forms

//view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);


//required for passport
//app.use(session({ secret: 'iloveyoudear...' })); // session secret

/* uncomment for prod */
// let options = { host: redisHost, port: 6379};
// var client  = redis.createClient(options);
// app.use(session({
//     store: new redisStore({ host: redisHost, port: 6379, client: client,ttl :  260}),
//     secret: 'I Love India...',
//     resave: true,
//     saveUninitialized: true
// }));

/* comment for prod */
app.use(session({
	secret: 'expresssecret',
	resave: true,
	saveUninitialized: true
}));

app.use(flash()); // use connect-flash for flash messages stored in session

// csrf code

var csrfProtection = csrf({ cookie: true });


/* React Routes */


// routes ======================================================================
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport


//launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

//catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(404).render('404', { title: "Sorry, page not found", session: req.sessionbo });
});

app.use(function (req, res, next) {
	res.status(500).render('404', { title: "Sorry, page not found" });
});
exports = module.exports = app;