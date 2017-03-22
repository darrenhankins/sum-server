const Model = require('objection').Model;
const Item = require('./item');

class User extends Model {
  static get tableName() {
    return 'user';
  }

  static get relationMappings() {
    return {
      // model:user can have many items
      item: {
        relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: 'user.id',
          to: 'item.user_id'
        }
      },

      // Model: item has many groups
      group: {
        // relation: Model.HasManyRelation,
        relation: Model.ManyToManyRelation,
        modelClass: Group,
        join:{
          from: 'user.id',
          through: {
            from: 'group_user.user_id',
            to: 'group_user.group_id'
          },
          to: 'group.id'
        }
      }
    };
  }
}

module.exports = User;
