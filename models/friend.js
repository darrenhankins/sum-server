const Model = require('objection').Model;
// const Group = require('./group');

class Friend extends Model {
  static get tableName() {
    return 'friend';
  }

  static get relationMappings() {
    return {
      // a friend can have on user
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'friend.user_id',
          to: 'user.id'
        }
      },
      // Model: friend has many groups
      // many friends can be part of many groups
      group: {
        // relation: Model.HasManyRelation,
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/group',
        join:{
          from: 'friend.id',
          through: {
            from: 'group_friend.friend_id',
            to: 'group_friend.group_id'
          },
          to: 'group.id'
        }
      },



      // // Model: friend has many groups
      // group_friend: {
      //   // relation: Model.HasManyRelation,
      //   relation: Model.ManyToManyRelation,
      //   modelClass: __dirname + '/group_friend',
      //   join:{
      //     from: 'group_friend.friend_id',
      //     to: 'friend.id'
      //   }
      // },


      // a friend can have 1 item_status
      item_status: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/item_status',
        join: {
          from: 'friend.id',
          to: 'item_status.item_id'
        }
      }
    };
  }
}

module.exports = Friend;
