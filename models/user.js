const Model = require('objection').Model;
// const Item = require('./item');
// const Group = require('./group');
// const Friend = require('./friend');

class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
      item: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/item',
        join: {
          from: 'user.id',
          to: 'item.user_id'
        }
      },
      friend: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/friend',
        join: {
          from: 'user.id',
          to: 'friend.user_id'
        }
      },
      group: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/group',
        join: {
          from: 'user.id',
          to: 'group.user_id'
        }
      }
    };
  }
}

module.exports = User;
