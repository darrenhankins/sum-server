const knex = require('./knex');
const bcrypt = require('bcrypt');
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

  comparePass: function(userPassword, databasePassword) {
    console.log(userPassword, databasePassword)
    const bool = bcrypt.compareSync(userPassword, databasePassword);
    // if (!bool) throw new Error('bad password');
    if (!bool) return false;
    else return true;
  },

  getUser: function(email) {
    return knex('user')
      .where('email', email)
      .first()
      .catch(err => {
        // var response =  {
        //   status: "failure",
        //   message: "Email Already Exists"
        // };
        // return response;
        console.log('Email not found');
      });
  },

  createUser: function(user) {
    let hash = bcrypt.hashSync(user.password, 10);
    return User
    .query()
    .insert({username: user.username, email: user.email, password: hash})
    .then(user => {
      console.log(user instanceof User); // true
    })
    .catch(err => {
      var response =  {
        status: "failure",
        message: "Email Already Exists"
      };
      return response;
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

  createFriend: function(friend) {
    return Friend
    .query()
    .insert({user_id: friend.user_id, name: friend.name, email: friend.email})
    .then(friend => {
      console.log(friend instanceof friend); // true
    })
    .catch(err => {
      console.log('Didn\'t create friend');
    });
  },

  createGroup: function(group) {
    return Group
    .query()
    .insert({user_id: group.user_id, name: group.name})
    .then(group => {
      console.log(group instanceof Group); // true
    })
    .catch(err => {
      console.log('Didn\'t create group');
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
      .where('user_id', '=', user_id)
      .eager('[friend]');
  },

  getAllFriendsByUserId: function(user_id){
    console.log("Get Friends");
    return Friend
      .query()
      .where('user_id', '=', user_id)
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

  updateItemAndUUID: function(item_id) {
    return Item
    .query()
    // .patch({ available: false })
    .patchAndFetchById(item_id, { available: false })
    // .where('item_id', '=', item_id)
    .then(item => {
      console.log(item instanceof Item); // true
    })
    .catch(err => {
      console.log('Didn\'t create item');
    });
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
