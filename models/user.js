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
      }
    };
  }
}

module.exports = User;
