var express = require('express');
var router = express.Router();
var knex = require('../db/v2/knex');
var bcrypt = require('bcrypt');

var encrypt = require('../auth/encrypt');
var token = require('../auth/token');


router.post('/', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  return encrypt.getUser(email)
  .then((response) => {
    encrypt.comparePass(password, response.password);
    return response;
  })
  .then((response) => { return token.encodeToken(response); })
  .then((token) => {
    res.status(200).json({
      status: 'success',
      token: token
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      message: err,
      status: 'error'
    });
  });
});


module.exports = router;
