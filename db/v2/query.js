const knex = require('./knex');
const uuidV4 = require('uuid/v4');
const objection = require('objection');

// require all models
const Friend = require('../../models/friend');
const Group = require('../../models/group');
const Item_sell = require('../../models/item_sell');
const Item_status = require('../../models/item_status');
const Item = require('../../models/item');
const User = require('../../models/user');


module.exports = {

  findUserByEmail: function(email) {
    return knex('user')
      .where('email', email).first();
  },

  createUser: function(user) {
    return User
    .query()
    .insert({username: user.username, email: user.email, password: user.password})
    .then(user => {
      console.log(user instanceof User); // true
    })
    .catch(err => {
      console.log('Didn\'t create user');
    });
  },

  getItemById: function(item_id) {
    return Item
      .query()
      .findById(item_id);
  },

  // getAllItemsByUser: function(user_id){
  //   // return knex('item')
  //   return Item
  //   .query()
  //   .findById(user_id);
  //   // .then(function (user) {
  //   //   if (!user) { throwNotFound(); }
  //   //     return user
  //   //     .$relatedQuery('items')
  //   //     .insert(body);
  //   // });
  // }

  getItemAndRelated: function(user_id) {
    return Item
      .query()
      .findById(user_id)
      .eager('[item_status, item_sell, group]');
  },

  getItemAndUUID: function(item_id) {
    return Item
      .query()
      .findById(item_id)
  },

  getGroupEmails: function(user_id){
    return Item
      .query()
      .findById(user_id)
      .eager('[item_status, item_sell, group, group.[friend]]');
  }

  // getUser: function(id) {
  //   return User
  //     .query()
  //     .findById(id);
  // }

};



function throwNotFound() {
  var error = new Error();
  error.statusCode = 404;
  throw error;
}
