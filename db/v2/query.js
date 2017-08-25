const knex = require('./knex');
const bcrypt = require('bcryptjs');
const uuidV4 = require('uuid/v4');
const objection = require('objection');

// require all models
const Friend = require('../../models/friend');
const Group = require('../../models/group');
const GroupFriend = require('../../models/group_friend');
const GroupItem = require('../../models/group_item');
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

// ****** ITEMS ******* //
  // Get all items [group, item_status, item_sell]
  getItems: function(user_id){
    return Item
      .query()
      .where('user_id', '=', user_id)
      // .eager('[group, item_status, item_sell]');
      .eager('[item_status, item_sell]');

  },
  // Creates new item
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
  // Gets 1 item [groups, item_status, item_sell]
  getItemById: function(item_id) {
    return Item
      .query()
      .findById(item_id)
      // .eager('[group.[friend], item_status.[friend], item_sell]');
      .eager('[group, item_status.[friend], item_sell]');

  },

  // getItemGroupsFriends: function(item_id)

  updateItem: function(item_id, item) {
    return Item
    .query()
    // .where('id', '=', friend.friend_id)
    .where('id', '=', item_id)
    .update({ name: item.name, image_url: item.image_url, description: item.description })
    .then(item => {
      console.log(item instanceof item); // true
    })
    .catch(err => {
      console.log('Didn\'t update item');
    });
  },

  deleteItem: function(item_id) {
    return Item
    .query()
    .delete()
    .where('id', '=', item_id)
    .then(item => {
      console.log(item instanceof item); // true
    })
    .catch(err => {
      console.log('Didn\'t delete item');
    });
  },

  // getItemById: function(item_id) {
  //   return Item
  //     .query()
  //     .findById(item_id);
  // },

  // ****** FRIENDS ****** //

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

  updateFriend: function(id, friend) {
    return Friend
    .query()
    // .where('id', '=', friend.friend_id)
    .where('id', '=', id)
    .update({ name: friend.name, email: friend.email})
    .then(friend => {
      console.log(friend instanceof Friend); // true
    })
    .catch(err => {
      console.log('Didn\'t update friend');
    });
  },




  deleteFriend: function(friend) {
    return Friend
    .query()
    .delete()
    .where('id', '=', friend)
    .then(friend => {
      console.log(friend instanceof friend); // true
    })
    .catch(err => {
      console.log('Didn\'t delete friend');
    });
  },

  // ****** GROUPS ******* //

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

  createItemGroup: function(user_id, item_id, group_id) {
    // console.log("ITEM ID: ", item_id, "GROUP ID: ", group_id);
    return GroupItem
    .query()
    .insert({item_id: item_id, group_id: group_id})
    // .insert({user_id:user_id, item_id: item_id, group_id: group_id})
    .then(groupitem => {
      console.log("CREATE ITEM GROUP: ", groupitem instanceof GroupItem);
    })
    .catch(err => {
      console.log('Didn\'t create Group - Item');
    });
  },

  deleteItemGroup: function(item_id, group_id) {
    return GroupItem
    .query()
    .delete()
    .where('item_id', '=', item_id)
    .andWhere('group_id', '=', group_id)
    .then(groupitem => {
      console.log(groupitem instanceof GroupItem);
    })
  },

  updateGroup: function(id, group) {
    return Group
    .query()
    .where('id', '=', id)
    .update({ name: group.name})
    .then(group => {
      console.log("updateGroup => ", group instanceof Group); // true
    })
    .catch(err => {
      console.log('Didn\'t update group');
    });
  },

  createGroupFriends: function(user_id, group_id, friend_id) {
    console.log("GROUP-----> ID", group_id);
    console.log("Friend-----> ID", friend_id);

    return GroupFriend
    .query()
    // .insert({user_id: user_id, group_id: group_id, friend_id: friend_id})
    .insert({group_id: group_id, friend_id: friend_id})
    // .insert({group_id: 11, friend_id: 13})
    .then( groupFriend => {
      console.log(groupFriend instanceof GroupFriend); // true
    })
    .catch(err => {
      console.log("Didn't create GroupFriend");
      console.log(err);

    });
  },

  deleteGroupFriends: function(user_id, group_id, friend_id){
    return GroupFriend
      .query()
      .delete()
      // .where('user_id', '=', user_id)
      // .andWhere('group_id', '=', group_id)
      .where('group_id', '=', group_id)
      .andWhere('friend_id', '=', friend_id)
      .then(groupFriend => {
        console.log(groupFriend instanceof GroupFriend); // true
      })
      .catch(err => {
        console.log("Didn't delete GroupFriend")
      })
  },

  deleteGroup: function(group) {
    return Group
    .query()
    .delete()
    .where('id', '=', group)
    .then(group => {
      console.log(group instanceof group); // true
    })
    .catch(err => {
      console.log('Didn\'t delete group');
    });
  },
  // Get all groups [friends]
  getGroups: function(user_id){
    console.log("Get Groups");
    return Group
      .query()
      .where('user_id', '=', user_id)
      .eager('[friend]');
  },

  // Get all groups [friends]
  getAllGroupsForUser: function(user_id){
    console.log("Get Groups");
    return Group
      .query()
      .where('user_id', '=', user_id);
  },

  getAllFriendsByUserId: function(user_id){
    console.log("Get Friends");
    return Friend
      .query()
      .where('user_id', '=', user_id)
      .eager('[user]');
  },

  getAllFriendsAndGroupsByUserId: function(user_id){
    console.log("Get Friends");
    return Friend
      .query()
      .where('user_id', '=', user_id)
      .eager('[group]');
  },
// new one
  getFriendsInGroups: function(group_id){
    console.log("Get Friends in Groups");
    return GroupFriend
      .query()
      .where('group_id', '=', group_id)
      .eager('[friend]');

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
      // .eager('[item_status, item_sell, group, group.[friend]]');
      .eager('[item_status, item_sell, group.[friend]]');

  }

};



function throwNotFound() {
  var error = new Error();
  error.statusCode = 404;
  throw error;
}
