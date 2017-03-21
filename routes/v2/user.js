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


router.post('/signup',(req, res, next) =>{

});



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
// router.get('/:id/items', (req, res, next) => {
//   if(!isNaN(req.params.id)){
//     query.getAllItems(req.params.id)
//       .then(items => {
//         res.json(items);
//       });
//   } else {
//     resError(res, 500, "Item Not Found")
//   }
// });


router.get('/:id/items/:item_id/friend/:friend_id/uuid/:uuid', function(req, res, next) {
    query.getItemAndUUID(req.params.item_id)
        .then(function(item) {
            // return res.json(item);
            if (req.params.uuid == item.uuid) {
              console.log("THE Match!!!");
              console.log(req.params.friend_id);
            }
        })
        .catch(err => {
            res.send(err);
        });
});



// Send email to groups
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "darren@xtremecartoon.com",
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
            for (let i = 0; i < groups.length; i++) {
                let friends = groups[i].friend;
                for (let j = 0; j < friends.length; j++) {
                    let friend_id = friends[j].id;
                    let friend_name = friends[j].name;
                    let friend_email = friends[j].email;
                    // console.log(friend_name);
                    // console.log(friend_email);
                    // console.log("https//sharesumstuff.com/user/"+user_id+"/items/"+item_id+"/uuid/"+uuid);
                    var mailOptions = {
                        to: friend_email,
                        subject: "Something you may be interested in...$"+cost,
                        text: "Hi " + friend_name + ",\n\nPlease take a look at this item I am wanting to get rid of...\n"
                          +image_url+"\n\nPlease select the link below to claim this item..."+"\n\nhttp://localhost:3000/claim/item/"+item_id+"/friend/"+friend_id+"/uuid/"+uuid
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
                }
            }
        })
        .catch(err => {
            res.send(err);
        });
});



module.exports = router;
