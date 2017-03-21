const Model = require('objection').Model;
const Item = require('./item');

class Item_sell extends Model {
  static get tableName() {
    return 'item_sell';
  }

  static get relationMappings() {
    return {
      // Model: item_status can have one item
      item: {
        relation: Model.BelongsToOneRelation,
        // relation: Model.HasManyRelation,
        modelClass: Item,
        join: {
          from: 'item.id',
          to: 'item_sell.item_id'
        }
      }
    };
  }
}

module.exports = Item_sell;
