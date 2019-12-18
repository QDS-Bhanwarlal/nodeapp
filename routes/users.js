var express = require('express');
var router = express.Router();

const knex = require('../knex/knex.js');

const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

/* GET Users */
router.get('/', function(req, res, next) {
  knex.select().table('users').then(users => {
    res.send({
      "success": true,
      "payload": users
    });
  }).catch(err => {
    res.send({
      "success": false,
      "message": "Something went wrong."
    });
  });
});

/* GET users count*/
router.get('/count', function(req, res, next) {
  knex('users').count('*', {as: 'user_count'}).then(count => {
    res.send({
      "success": true,
      "payload": count
    });
  }).catch(err => {
    res.send({
      "success": false,
      "message": "Something went wrong."
    });
  });
});

/* Find by Id*/
router.get('/:userId', function(req, res, next) {
  knex('users').where('id', '=', req.params.userId).then(user => {
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
  }).catch(err => {
    res.send({
      "success": false,
      "message": "Something went wrong."
    });
  });
});

router.post('/:userId/upload', function(req, res, next) {
  let profile_img = req.files.profile_img;
  profile_img.mv(__dirname + "/../public/images/" + profile_img.name, function(err) {
    if (err)
      return res.status(500).send(err);

    knex('users').where('id', '=', req.params.userId).update({ profile_img: profile_img.name }).then(()=>{
      res.send('File uploaded!');
    }).catch(err => {
      res.send({
        "success": false,
        "message": "Something went wrong."
      });
    });
  });
});

module.exports = router;


// console.log(sampleFile.name);
  // fs.readFile(sampleFile, (err, data) => {
  //   if (err) throw err;
  //   const params = {
  //       Bucket: 'nodeapp-files',
  //       Key: sampleFile.name, 
  //       Body: JSON.stringify(data, null, 2)
  //   };
  //   s3.upload(params, function(s3Err, data) {
  //       if (s3Err) throw s3Err
  //       console.log(`File uploaded successfully at ${data.Location}`)

      // res.send({
      //   "success": true,
      //   "message": "DONE"
      // });
  //   });
  // });