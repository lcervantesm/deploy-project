var db = require("../models");

// ...
module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  // Render login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/dashboard", function(req, res) {
    res.render("admin");
  });

  app.get("/create", function(req, res) {
    res.render("create");
  });
  // Load example page and pass in an example by id
  app.get("/dashboard/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("admin", {
        name: dbExample,
        id: id,
        surveys: surveys,
        questions: []
      });
    });
  });

  // Render Register Handlebars
  app.get("/register", function(req, res) {
    res.render("register");
  });

  //Render Admin Dashboard

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
