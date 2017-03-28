const Model = require('objection').Model;
// const Group = require('./group');

class Item extends Model {
  static get tableName() {
    return 'item';
  }

  static get relationMappings() {
    return {
      // Model: item can have one user
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/user',
        join: {
          from: 'item.user_id',
          to: 'user.id'
        }
      },
      // Model: item has many groups
      group: {
        // relation: Model.HasManyRelation,
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/group',
        join:{
          from: 'item.id',
          through: {
            from: 'group_item.item_id',
            to: 'group_item.group_id'
          },
          to: 'group.id'
        }
      },
      // Model: item can have one item_status
      item_status: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/item_status',
        join: {
          from: 'item.id',
          to: 'item_status.item_id'
        }
      },
      // Model: item can have one item_sell
      item_sell: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/item_sell',
        join: {
          from: 'item.id',
          to: 'item_sell.item_id'
        }
      }
    };
  }
}

module.exports = Item;
