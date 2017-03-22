
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM item; ALTER SEQUENCE item_id_seq RESTART WITH 1')
    .then(function() {
      const items = [{
        user_id: 1,
        name: 'Rockies Tickets',
        description: '2 Tickets to Opening Day',
        image_url: 'http://hlsb.com/Images/Rockies/tickets.png',
        free: false, // sell
        available: true,
        emailed: false,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06741'
      },{
        user_id: 1,
        name: 'Dresser',
        description: '5 drawer, white dresser',
        image_url: 'http://c.shld.net/rpx/i/s/i/spin/10042637/prod_1914099412?hei=245&wid=245&op_sharpen=1&qlt=85',
        free: true, // share
        available: false,
        emailed: false,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06742'
      },{
        user_id: 1,
        name: 'Jeep',
        description: '1985 Green Jeep, 4x4',
        image_url: 'http://images.indexusedcars.com/Jeep/CJ7/1985/0b1f8cfc-d681-4ce6-ad0d-3ce5069bfd36/Jeep_CJ7_1985.jpeg',
        free: false, // barter
        available: true,
        emailed: false,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06743'
      },{
        user_id: 1,
        name: 'Football Party',
        description: 'Super Bowl Game shirt',
        image_url: 'http://harvardmagazine.com/sites/default/files/inline_images/2016-SeptOct/Football.png',
        free: true, // share
        available: true,
        emailed: false,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06744'
      },{
        user_id: 2,
        name: 'Baseball Cap',
        description: 'Colorado Rockies Baseball Cap',
        image_url: '',
        free: true, // share
        available: true,
        emailed: false,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06745'
      },{
        user_id: 2,
        name: 'Baseball Bat',
        description: 'Youth Baseball Bat',
        image_url: '',
        free: true, // share
        available: true,
        emailed: false,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06746'
      }];
      return knex('item').insert(items);
    });
};
