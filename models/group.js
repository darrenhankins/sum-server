const Model = require('objection').Model;
// const Item = require('./item');
// const Friend = require('./friend');

class Group extends Model {
  static get tableName() {
    return 'group';
  }

  static get relationMappings() {
    return {
      // Model: group has many items
      // user: {
      //   // relation: Model.HasManyRelation,
      //   relation: Model.ManyToManyRelation,
      //   modelClass: __dirname + '/user',
      //   join:{
      //     from: 'group.id',
      //     through: {
      //       from: 'group_user.group_id',
      //       to: 'group_user.user_id'
      //     },
      //     to: 'user.id'
      //   }
      // },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'group.user_id',
          to: 'user.id'
        }
      },

      item: {
        // relation: Model.HasManyRelation,
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/item',
        join: {
          from: 'group.id',
          through: {
            from: 'group_item.group_id',
            to: 'group_item.item_id'
          },
          to: 'item.id'
        }
      },
      // Model: group has many friends
      friend: {
        // relation: Model.HasManyRelation,
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/friend',
        join:{
          from: 'group.id',
          through: {
            from: 'group_friend.group_id',
            to: 'group_friend.friend_id'
          },
          to: 'friend.id'
        }
      }
    };
  }
}

module.exports = Group;
