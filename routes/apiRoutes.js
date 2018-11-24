var Sequelize = require("sequelize");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

var db = require("../models");

module.exports = function(app) {
  //Get data on a specific user
  app.get("/api/users/:userid", function(req, res) {
    db.User.findAll({
      where: {
        id: req.params.userid
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  //Get all forms for a user (based on "group", not user)
  app.get("/api/forms/:groupid", function(req, res) {
    db.Form.findAll({
      where: {
        GroupId: req.params.groupid
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  //Get all users in a group
  app.get("/api/users/:groupid", function(req, res) {
    db.Group.findAll({
      where: {
        GroupId: req.params.groupid
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  //Get submissions for a specific form
  app.get("/api/form/:formid", function(req, res) {
    var formId = req.params.formid;
    console.log(formId);
    sequelize.query("SELECT * FROM " + formId).then(function(data) {
      res.json(data);
    });
  });

  //Create user
  app.put("/api/users", function(req, res) {
    db.User.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  //Create group (this needs to happen automatically when a new user signs up--if they sign up on main page, they are automatically an admin of a new group.)
  app.put("/api/groups", function(req, res) {
    db.Group.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  //Create form (AND CREATE TABLE FOR FORM in this same moment? or separately?*****)
  app.put("/api/forms", function(req, res) {
    var questions = req.body.questions;
    var columns = "";
    for (i = 0; i < questions.length; i++) {
      columns += questions[i];
      if (i < questions.length - 1) {
        columns += " VARCHAR(255), ";
      } else {
        columns += " VARCHAR(255)";
      }
    }
    var query = "CREATE TABLE " + req.body.id + " (" + columns + ")";
    sequelize.query(query);
    db.Form.create({
      id: req.body.id,
      form_name: req.body.form_name,
      GroupId: req.body.GroupId,
      UserId: req.body.UserId
    }).then(function(data) {
      res.json(data);
    });
  });

  //Insert form submissions to form table
  app.put("/api/formresponses/:formid", function(req, res) {
    var formId = req.params.formid;
    var responses = req.body.responses;
    var values = "";
    for (i = 0; i < responses.length; i++) {
      values += "'" + responses[i] + "'";
      if (i < responses.length - 1) {
        values += ", ";
      }
    }
    var query = "INSERT INTO " + formId + " VALUES (" + values + ")";
    console.log(query);
    sequelize.query(query).then(function(data) {
      res.json(data);
    });
  });

  //Update user
  app.put("/api/users/:userid", function(req, res) {
    db.User.update(req.body, {
      where: {
        id: req.params.userid
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  //Update group
  app.put("/api/group/:groupid", function(req, res) {
    db.Group.update(req.body, {
      where: {
        id: req.params.groupid
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  //Update forms (pending, not essential for MVP)

  //Delete form
  app.delete("/api/forms/:formid", function(req, res) {
    db.Form.destroy({
      where: {
        id: req.params.formid
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  //Delete user (admins only; does *not* delete forms created by user)
  app.delete("/api/users/:userid", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.userid
      }
    }).then(function(data) {
      res.json(data);
    });
  });

  //Delete group (only an admin user can do this; it deletes all group data including users and forms)
  app.delete("/api/gropus/:groupid", function(req, res) {
    db.Group.destroy({
      where: {
        id: req.params.groupid
      }
    }).then(function(data) {
      res.json(data);
    });
  });
};
