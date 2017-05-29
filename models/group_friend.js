const Model = require('objection').Model;
// const User = require('./user');
// const Friend = require('./friend');

class GroupFriend extends Model {
  static get tableName() {
    return 'group_friend';
  }

  static get relationMappings() {
    return {

      groups: {
       relation: Model.ManyToManyRelation,
       modelClass: __dirname + '/friend',
       join: {
         from: 'friend.id',
         // ManyToMany relation needs the `through` object
         // to describe the join table.
         through: {
           // If you have a model class for the join table
           // you need to specify it like this:
           // modelClass: PersonMovie,
           from: 'group_friend.group_id',
           to: 'group_friend.friend_id'
         },
         to: 'group.id'
       }
     }

    };
  }
}

module.exports = GroupFriend;
