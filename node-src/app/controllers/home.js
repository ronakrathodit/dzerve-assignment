var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
const Sequelize = require('sequelize');
const config = require('../../config/database.js');

exports.connection = function (req, res) {
	config.authenticate().complete(function (err) {
		if (err) {
			console.log('There is connection in ERROR');
		} else {
			console.log('Connection has been established successfully');
		}
	});

}

exports.loggedIn = function (req, res, next) {
	if (req.session.user) { // req.session.passport._id

		next();

	} else {

		res.redirect('/login');

	}

}

exports.home = function (req, res) {


	res.render('home.ejs', {
		error: req.flash("error"),
		success: req.flash("success"),
		session: req.session,

	});

}


exports.signup = function (req, res) {

	if (req.session.user) {

		res.redirect('/home');

	} else {

		res.render('signup', {
			error: req.flash("error"),
			success: req.flash("success"),
			session: req.session
		});
	}

}


exports.login = function (req, res) {



	if (req.session.user) {

		res.redirect('/home');

	} else {

		res.render('login', {
			error: req.flash("error"),
			success: req.flash("success"),
			session: req.session
		});

	}

}



