var express = require('express');
var router = express.Router();

const query = require('../db/query');


// Get all items for user => GET /user/:id
// Get one item for user => GET /user/:id/item/:id
// Create new item for user => POST /user/:id
// Delete one item for user => DELETE /user/:id/item/:id
// Update one item for user => PATCH /user/:id/item/:id

// get all items of user
router.get('/:id', (req, res, next) => {
  if(!isNaN(req.params.id)){
    query.getAllItems(req.params.id)
      .then(items => {
        res.json(items);
      });
  } else {
    resError(res, 500, "Item Not Found")
  }
});
// get one item of user
router.get('/:id/item/:item_id', (req, res, next) => {
  if(!isNaN(req.params.id) || !isNaN(req.params.item_id)){
    query.getItem(req.params.id, req.params.item_id)
      .then(items => {
        res.json(items);
      });
  } else {
    resError(res, 500, "Item Not Found")
  }
});
// add item to user
router.post('/:id', (req, res, next) => {
  query.addItem(req.params.id, req.body)
    .then(items => {
      res.json(items);
    });
});
// update item
router.patch('/:id/item/:item_id', (req, res, next) => {
  query.updateItem(req.params.id, req.params.item_id, req.body)
    .then(items => {
      res.json(items);
    });
});
// delete item from user
router.delete('/:id/item/:item_id', (req, res, next) => {
  if(!isNaN(req.params.id) || !isNaN(req.params.item_id)){
    query.deleteItem(req.params.id, req.params.item_id)
      .then(items => {
        res.json(items);
      })
    } else {
      resError(res, 500, "Item Not Found")
    }
});


module.exports = router;
