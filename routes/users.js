var express = require('express');
var router = express.Router();


let users = [
  {
    id: 1,
    name: 'Mukesh',
    location: 'Virar'
  },
  {
    id: 2,
    name: 'Prakash',
    location: 'Palghar'
  },
  {
    id: 3,
    name: 'Piyush',
    location: 'Andheri'
  },
  {
    id: 4,
    name: 'Ganesh',
    location: 'Bandra'
  },
  {
    id: 5,
    name: 'Sachin',
    location: 'Borivali'
  }
];


/* GET Users */
router.get('/', function(req, res, next) {
  res.send({
    "success": true,
    "payload": users
  });
});

/* GET users count*/
router.get('/count', function(req, res, next) {
  res.send({
    "success": true,
    "payload": {
      user_count: users.length
    }
  });
});

/* Find by Id*/
router.get('/:userId', function(req, res, next) {
  let user = users.filter(function(user) {
    return user.id == req.params.userId;
  });
  if(user.length > 0){
    res.send({
      "success": true,
      "payload": user
    });
  }else{
    res.send({
      "success": false,
      message: "No user found User Id:"+req.params.userId
    });
  }
});

module.exports = router;