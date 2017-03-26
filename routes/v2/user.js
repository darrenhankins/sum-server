require("dotenv").config(); // or load()
var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

// const knex = require('../db/knex');
const query = require("../../db/v2/query");

// http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
// Get all items for user => GET /user/:id/items
// Get one item for user => GET /user/:id/items/:item_id
// Create new item for user => POST /user/:id/items
// Delete one item for user => DELETE /user/:id/items/:item_id
// Update one item for user => PATCH /user/:id/items/:item_id


// Get 'item' and 'item_status' by item.id
router.get('/:id/items/:item_id', function(req, res, next) {
    query.getItemAndRelated(req.params.item_id)
        .then(function(item) {
            return res.json(item);
        })
        .catch(err => {
            res.send(err);
        });
});

// get all items of user
router.get('/:id/items', (req, res, next) => {
  if(!isNaN(req.params.id)){
    query.getAllItemsByUserId(req.params.id)
      .then(items => {
        res.json(items);
      });
  } else {
    resError(res, 500, "Item Not Found")
  }
});

// get all groups of user
router.get('/:id/groups', (req, res, next) => {
  if(!isNaN(req.params.id)){
    query.getAllGroupsByUserId(req.params.id)
      .then(groups => {
        res.json(groups);
      });
  } else {
    resError(res, 500, "Groups Not Found")
  }
});

// get all groups of user
router.get('/:id/friends', (req, res, next) => {
  if(!isNaN(req.params.id)){
    console.log("Route Hit");
    query.getAllFriendsByUserId(req.params.id)
      .then(friends => {
        res.json(friends);
      });
  } else {
    resError(res, 500, "Friends Not Found")
  }
});


router.post('/:id/friends', (req, res, next) => {
    console.log(req.body);
    query
      .createFriend(req.body)
      .then(friend => {
        res.json(friend);
      });
});



router.get('/:id/items/:item_id/friend/:friend_id/uuid/:uuid', function(req, res, next) {
    query.getItemAndUUID(req.params.item_id)
        .then(function(item) {
            // return res.json(item);
            if (req.params.uuid == item.uuid) {
              console.log("THE Match!!!");
                // console.log(req.params.friend_id);
            }
        })
        .catch(err => {
            res.send(err);
        });
});


router.patch('/claim/items/:item_id', function(req, res, ext) {
  console.log("route hit");
  query.updateItemAndUUID(req.params.item_id)
    .then(function(item) {
      console.log("Item - Here -->");
    })
});

router.post('/:id/items', (req, res, next) => {
    console.log(req.body);
    query
      .createItem(req.body)
      .then(item => {
        res.json(item);
      });
});


router.post('/:id/groups', (req, res, next) => {
    console.log(req.body);
    query
      .createGroup(req.body)
      .then(group => {
        res.json(group);
      });
});

router.post('/:id/group', (req, res, next) => {
    // check to stee if email is unique
    console.log(req.body);
    query
      .createGroup(req.body)
      .then(group => {
        res.json(group);
      });
});

// Send email to groups
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "sharesumstuff@gmail.com",
        pass: process.env.GMAIL_PASSWORD
    }
});

router.get('/:id/items/:item_id/sendemail', function(req, res, next) {
    query.getGroupEmails(req.params.item_id)
        .then(function(emails) {
            // return res.json(emails);
            console.log(emails);
            var item_id = emails.id;
            var user_id = emails.user_id;
            var image_url = emails.image_url;
            var uuid = emails.uuid;
            var groups = emails.group;
            if (emails.free){
              var cost = "FREE";
            } else {
              var cost = emails.item_sell.price;
              console.log(cost);
            }
            // var friends = groups[0].friend;
            // console.log(groups[0].friend.length);

            // for (let i = 0; i < groups.length; i++) {
                // let friends = groups[i].friend;
                // for (let j = 0; j < friends.length; j++) {
                    // let friend_id = friends[j].id;
                    // let friend_name = friends[j].name;
                    // let friend_email = friends[j].email;

                    let friend_id = 3;
                    let friend_name = "Darren";
                    let friend_email = "sharesumstuff@gmail.com";
                    // console.log(friend_name);
                    // console.log(friend_email);
                    // console.log("https//sharesumstuff.com/user/"+user_id+"/items/"+item_id+"/uuid/"+uuid);
                    var mailOptions = {
                        to: friend_email,
                        subject: "Something you may be interested in...$"+cost,
                        text: "Hi " + friend_name + ",\n\nPlease take a look at this item I am wanting to get rid of...\n"
                          +image_url+"\n\nPlease select the link below to claim this item..."+"\n\nhttp://localhost:3005/claim/item/"+item_id+"/friend/"+friend_id+"/uuid/"+uuid
                    }
                    // console.log(mailOptions);
                    smtpTransport.sendMail(mailOptions, function(error, response) {
                        if (error) {
                            console.log(error);
                            res.end("error");
                        } else {
                            console.log("Message sent: " + response.message);
                            res.end("sent");
                        }
                    });
                // }
            // }
        })
        .catch(err => {
            res.send(err);
        });
});



module.exports = router;
