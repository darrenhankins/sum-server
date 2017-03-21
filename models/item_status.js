const Model = require('objection').Model;
const Item = require('./item');

class Item_status extends Model {
  static get tableName() {
    return 'item_status';
  }

  static get relationMappings() {
    return {
      // Model: item_status can have one item
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item,
        join: {
          from: 'item.id',
          to: 'item_status.item_id'
        }
      }
    };
  }
}

module.exports = Item_status;
