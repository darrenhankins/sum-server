
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM item; ALTER SEQUENCE item_id_seq RESTART WITH 1')
    .then(function() {
      const items = [{
        user_id: 1,
        // friend_id: 3,
        name: 'Rockies Tickets',
        description: '2 Tickets to Opening Day',
        image_url: 'http://hlsb.com/Images/Rockies/tickets.png',
        free: false // sell
      },{
        user_id: 1,
        friend_id: 2,
        name: 'Dresser',
        description: '5 drawer, white dresser',
        image_url: 'http://c.shld.net/rpx/i/s/i/spin/10042637/prod_1914099412?hei=245&wid=245&op_sharpen=1&qlt=85'
        // free: true  // default is true
      },{
        user_id: 1,
        // friend_id: 4,
        name: 'Jeep',
        description: '1985 Green Jeep, 4x4',
        image_url: 'http://images.indexusedcars.com/Jeep/CJ7/1985/0b1f8cfc-d681-4ce6-ad0d-3ce5069bfd36/Jeep_CJ7_1985.jpeg',
        free: false // barter
      },{
        user_id: 1,
        // friend_id: 4,
        name: 'Football Party',
        description: 'Super Bowl Game Celebration',
        image_url: '',
        free: false // share
      }];
      return knex('item').insert(items);
    });
};
