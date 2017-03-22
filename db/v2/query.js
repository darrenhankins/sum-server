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


  // user_id: 1,
  // name: 'Rockies Tickets',
  // description: '2 Tickets to Opening Day',
  // image_url: 'http://hlsb.com/Images/Rockies/tickets.png',
  // free: false, // sell
  // available: true,
  // emailed: false,
  // uuid: '7a955f98-2619-40c7-95c9-1a64a3e06741'


  createItem: function(item) {
    return Item
    .query()
    .insert({user_id: item.user_id, name: item.name, description: item.description, image_url: item.image_url})
    .then(item => {
      console.log(item instanceof Item); // true
    })
    .catch(err => {
      console.log('Didn\'t create item');
    });
  },


  getItemById: function(item_id) {
    return Item
      .query()
      .findById(item_id);
  },

  getAllItemsByUserId: function(user_id){
    return Item
      .query()
      .where('user_id', '=', user_id)
      .eager('[item_status, item_sell, group]');
  },

  getAllGroupsByUserId: function(user_id){
    console.log("Get Groups");
    return Group
      .query()
      .where('id', '=', user_id)
      .eager('[user]');
  },

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

};



function throwNotFound() {
  var error = new Error();
  error.statusCode = 404;
  throw error;
}
