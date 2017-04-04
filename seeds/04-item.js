
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
        available: false,
        emailed: true,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06741'
      },{
        user_id: 1,
        name: 'Dresser',
        description: '5 drawer, brown and white dresser',
        image_url: 'http://www.newportcottages.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/r/i/ricki-4-drawer-dresser.jpg',
        free: true, // share
        available: true,
        emailed: false,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06742'
      },{
        user_id: 1,
        name: 'Jeep',
        description: '1985 Red Jeep, 4x4',
        image_url: 'http://www.jeep.com/content/dam/fca-brands/na/jeep/en_us/global/header/Vehicles/Standard-Models/2017-Jeep-GlobalNav-VehicleCard-Standard-Wrangler.jpg.image.300.jpg',
        free: false, // barter
        available: true,
        emailed: false,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06743'
      },{
        user_id: 2,
        name: 'Football',
        description: 'Brand New Football',
        image_url: 'http://harvardmagazine.com/sites/default/files/inline_images/2016-SeptOct/Football.png',
        free: true, // share
        available: true,
        emailed: true,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06744'
      },{
        user_id: 2,
        name: 'Red Mountain Bike',
        description: 'Barely used mountain bike.',
        image_url: 'http://images.evo.com/imgp/700/105373/472194/intense-cycles-tracer-275a-foundation-complete-mountain-bike-2016-red.jpg',
        free: false, // share
        available: true,
        emailed: false,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06745'
      },{
        user_id: 3,
        name: 'Baseball Cap',
        description: 'Colorado Rockies Baseball Cap',
        image_url: 'http://www.villagehatshop.com/photos/product/standard/4511390S130006/mlb-baseball-caps/st-louis-cardinals-mlb-back-2-front-snapback-baseball-cap.jpg',
        free: true, // share
        available: true,
        emailed: false,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06746'
      },{
        user_id: 3,
        name: 'Baseball Bat',
        description: 'Youth Baseball Bat',
        image_url: 'https://www.baseballsavings.com/wcsstore/CatalogAssetStore/Attachment/images/products/baseball/P101443/1-z.jpg',
        free: true, // share
        available: true,
        emailed: true,
        uuid: '7a955f98-2619-40c7-95c9-1a64a3e06747'
      }];
      return knex('item').insert(items);
    });
};
