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

// ****** ITEMS ******* //

// Get all items [group, item_status, item_sell]
router.get('/:id/items', (req, res, next) => {
  if(!isNaN(req.params.id)){
    query.getItems(req.params.id)
      .then(items => {
        res.json(items);
      });
  } else {
    resError(res, 500, "Item Not Found")
  }
});

// Creates new item
router.post('/:id/items', (req, res, next) => {
  console.log(req.body);
  query
    .createItem(req.body)
    .then(item => {
      res.json(item);
    });
});

// router.patch('/:id/items/:item_id', (req, res, next) => {
router.post('/:id/items/:item_id', (req, res, next) => {
  console.log("UPDATE ITEM: GROUPS: ", req.body[1]);
  let item = req.body[0];
  let groups = req.body[1];
  query
    .updateItem(req.params.item_id, item)
    .then(item => {
        for(let y=0; y<groups.length; y++){
          if (groups[y].checked == true) {
            console.log("ID: ", groups[y].id);
            query
              // .createItemGroup(req.params.id, req.params.item_id, groups[y].id)
              .createItemGroup(req.params.item_id, groups[y].id)
              .then(group => {
                console.log("GROUP - ITEM added..... ", groups[y]);
              });
          } else {
            query
              // .deleteItemGroup(req.params.id, req.params.item_id, groups[y].id)
              .deleteItemGroup(req.params.item_id, groups[y].id)
              .then(group => {
                console.log("GROUP - ITEM deleted..... ", groups[y]);
                // for (let y=0; y<group.friends.length; y++){
                //   console.log("TEST !!!! => ", group.friends[y].name);
                // }
                // res.json(group);
              });
          }
      }

      res.json(item);
    });
});

router.delete('/:id/items/:item_id', function(req, res, next) {
  query
    .deleteItem(req.params.item_id)
    .then(function(item) {
      return res.json(item);
    });
});


router.delete('/:id/groups/:group_id', (req, res, next) => {
  console.log("DELETE Hit");
  console.log(req.params.group_id);
  query
    .deleteGroup(req.params.group_id)
    .then(group => {
      res.json(group);
    });
});


// Get 1 item [groups, item_status, item_sell]
router.get('/:id/items/:item_id', function(req, res, next) {
    query.getItemById(req.params.item_id)
        .then(function(item) {
          query.getAllGroupsForUser(req.params.id)
            .then(function(groups) {
              console.log("ITEM: ", item);
              console.log("GROUPS: ", groups);
              let data = [];
              data.push(item);
              data.push(groups);
              return res.json(data);
            })
        })
        .catch(err => {
            res.send(err);
        });
});
// Claim an item
router.patch('/claim/items/:item_id', function(req, res, next) {
  console.log("route hit");
  query.updateItemAndUUID(req.params.item_id)
    .then(function(item) {
      console.log("Item - Here -->");
    })
});

// ****** FRIENDS ******* //

// get all groups of user
router.get('/:id/friends', (req, res, next) => {
  if(!isNaN(req.params.id)){
    console.log("Route Hit");
    query.getAllGroupsForUser(req.params.id)
      .then(groups => {
        query.getAllFriendsAndGroupsByUserId(req.params.id)
          .then(friends => {
            // res.json(friends);
            let data = [];
            data.push(friends);
            data.push(groups);
            res.json(data);
          });
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

router.patch('/:id/friends/:friend_id', (req, res, next) => {
  console.log(req.body);
  query
    .updateFriend(req.body)
    .then(friend => {
      res.json(friend);
    });
});

router.delete('/:id/friends/:friend_id', (req, res, next) => {
  console.log("DELETE Hit");
  console.log(req.params.friend_id);
  query
    .deleteFriend(req.params.friend_id)
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

// ****** GROUPS ******* //
// Retrieve a User's Groups [friends] and Friends in that group
router.get('/:id/groups', (req, res, next) => {
  if(!isNaN(req.params.id)){
    query.getGroups(req.params.id)
      .then(groups => {
        query.getAllFriendsByUserId(req.params.id)
          .then(friends => {
            let data = [];
            data.push(groups);
            data.push(friends);
            res.json(data);
          });
      });
  } else {
    resError(res, 500, "Groups Not Found")
  }
});

router.post('/:id/groups', (req, res, next) => {
    console.log(req.body);
    query
      .createGroup(req.body)
      .then(group => {
        res.json(group);
      });
});

router.patch('/:id/groups/:group_id', (req, res, next) => {
  console.log(req.params.group_id, req.body);
  query
    .updateGroup(req.params.group_id,req.body)
    .then(group => {
      res.json(group);
    });
});

router.post('/:id/groups/:group_id', (req, res, next) => {
  console.log("HITTTTTT");
  query
    .updateGroup(req.params.group_id, req.body)
    .then(group => {
      for(let y=0; y<req.body.friends.length; y++){
        console.log("GroupFriend POST: ", req.params.group_id, req.body.friends[y]);
        if (req.body.friends[y].checked == true) {
          console.log("HEERRERERER.....");
          query
            // .createGroupFriends(req.params.id, req.params.group_id, req.body.friends[y].id)
            .createGroupFriends(req.params.group_id, req.body.friends[y].id)
            .then(group => {
              console.log("GROUP..... ", group);
              // for (let y=0; y<group.friends.length; y++){
              //   console.log("TEST !!!! => ", group.friends[y].name);
              // }
              // res.json(group);
            });
        } else {
          query
            // .deleteGroupFriends(req.params.id, req.params.group_id, req.body.friends[y].id)
            .deleteGroupFriends(req.params.group_id, req.body.friends[y].id)
            .then(group => {
              console.log("DELETE GROUP..... ", group);
              // for (let y=0; y<group.friends.length; y++){
              //   console.log("TEST !!!! => ", group.friends[y].name);
              // }
              // res.json(group);
            });
        }
    }
  })
});

router.post('/:id/friends/:friend_id', (req, res, next) => {
  console.log("HITTTTTT");
  query
    .updateFriend(req.params.friend_id, req.body)
    .then(friend => {
      for(let y=0; y<req.body.groups.length; y++){
        console.log("GroupFriend POST: ", req.params.friend_id, req.body.groups[y]);
        if (req.body.groups[y].checked == true) {
          console.log("HEERRERERER.....");
          query
            // .createGroupFriends(req.params.id, req.body.groups[y].id, req.params.friend_id)
            .createGroupFriends(req.body.groups[y].id, req.params.friend_id)
            .then(friend => {
              console.log("FRIEND..... ", friend);
              // for (let y=0; y<group.friends.length; y++){
              //   console.log("TEST !!!! => ", group.friends[y].name);
              // }
              // res.json(group);
            });
        } else {
          query
            // .deleteGroupFriends(req.params.id, req.body.groups[y].id, req.params.friend_id)
            .deleteGroupFriends(req.body.groups[y].id, req.params.friend_id)
            .then(friend => {
              console.log("DELETE FRIEND..... ", friend);
              // for (let y=0; y<group.friends.length; y++){
              //   console.log("TEST !!!! => ", group.friends[y].name);
              // }
              // res.json(group);
            });
        }
    }
  })
});

router.delete('/:id/groups/:group_id', (req, res, next) => {
  console.log("DELETE Hit");
  console.log(req.params.group_id);
  query
    .deleteGroup(req.params.group_id)
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
            console.log("emails ..... to send to .......",emails);
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
            console.log("How many groups are there.......", groups.length);
            var friends = "";
            var friends = groups[0].friend;
            console.log("Friends to send email to .......", friends);
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
