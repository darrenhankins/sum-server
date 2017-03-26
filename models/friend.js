const Model = require('objection').Model;
const Group = require('./group');

class friend extends Model {
  static get tableName() {
    return 'friend';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'friend.user_id',
          to: 'user.id'
        }
      },
      // Model: friend has many groups
      group: {
        // relation: Model.HasManyRelation,
        relation: Model.ManyToManyRelation,
        modelClass: Group,
        join:{
          from: 'friend.id',
          through: {
            from: 'group_friend.friend_id',
            to: 'group_friend.group_id'
          },
          to: 'group.id'
        }
      }
    };
  }
}

module.exports = friend;
