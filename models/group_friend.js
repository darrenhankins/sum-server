const Model = require('objection').Model;
// const User = require('./user');
// const Friend = require('./friend');

class GroupFriend extends Model {
  static get tableName() {
    return 'group_friend';
  }

  static get relationMappings() {
    return {

    //   groups: {
    //    relation: Model.ManyToManyRelation,
    //    modelClass: __dirname + '/friend',
    //    join: {
    //      from: 'friend.id',
    //      // ManyToMany relation needs the `through` object
    //      // to describe the join table.
    //      through: {
    //        // If you have a model class for the join table
    //        // you need to specify it like this:
    //        // modelClass: PersonMovie,
    //        from: 'group_friend.group_id',
    //        to: 'group_friend.friend_id'
    //      },
    //      to: 'group.id'
    //    }
    //  },


    //  group: {
    //   relation: Model.ManyToManyRelation,
    //   modelClass: __dirname + '/group',
    //   join: {
    //     from: 'friend.id',
    //     // ManyToMany relation needs the `through` object
    //     // to describe the join table.
    //     through: {
    //       // If you have a model class for the join table
    //       // you need to specify it like this:
    //       // modelClass: PersonMovie,
    //       from: 'group_friend.group_id',
    //       to: 'group_friend.friend_id'
    //     },
    //     to: 'group.id'
    //   }
    //  },
    //
    //  friend: {
    //   relation: Model.ManyToManyRelation,
    //   modelClass: __dirname + '/friend',
    //   join: {
    //     from: 'friend.id',
    //     // ManyToMany relation needs the `through` object
    //     // to describe the join table.
    //     through: {
    //       // If you have a model class for the join table
    //       // you need to specify it like this:
    //       // modelClass: PersonMovie,
    //       from: 'group_friend.group_id',
    //       to: 'group_friend.friend_id'
    //     },
    //     to: 'group.id'
    //   }
    // }



    //  friend: {
    //    // relation: Model.HasManyRelation,
    //    relation: Model.ManyToManyRelation,
    //    modelClass: __dirname + '/friend',
    //    join:{
    //      from: 'group_friend.friend_id',
    //      to: 'friend.id'
    //    }
    //  },
     //
    //  group: {
    //    // relation: Model.HasManyRelation,
    //    relation: Model.ManyToManyRelation,
    //    modelClass: __dirname + '/group',
    //    join:{
    //      from: 'group_friend.group_id',
    //      to: 'group.id'
    //    }
    //  }



    // Model: item_status can have one item
    // an group_friend can have 1 group
    group: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/group',
      join: {
        from: 'group.id',
        to: 'group_friend.group_id'
      }
    },
    // an item_status can have 1 friend
    friend: {
      relation: Model.BelongsToOneRelation,
      modelClass: __dirname + '/friend',
      join: {
        from: 'friend.id',
        to: 'group_friend.friend_id'
      }
    }


    };
  }
}

module.exports = GroupFriend;
