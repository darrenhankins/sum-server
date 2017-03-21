require("dotenv").config(); // or load()
var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();

// const knex = require('../db/knex');
const query = require("../db/v2/query");


function validUser(user) {
  const validEmail = typeof user.email == 'string' && user.email.trim() != '';
  const validPassword = typeof user.password == 'string' && user.password.trim() != '';
  return validEmail && validPassword;
}

router.post('/signup',(req, res, next) => {
  if(validUser(req.body)) {
    // check to see if email is unique
    query
      .findUserByEmail(req.body.email)
      .then(user => {
        if(user){
          next(new Error('Email In Use'));
        } else {
          const user = {
            username: req.body.username,
            email: req.body.email
          }
          bcrypt.hash(req.body.password, 10, (error, hash) => {
            user.password = hash;
            query
            .createUser(user)
            .then(user => {
              res.json(user);
            });
          });
        }
      })
  } else {
    next(new Error('Invalid User'));
  }
});


module.exports = router;
