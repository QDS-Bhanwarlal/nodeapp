const knex = require('../knex/knex.js');
const multipart = require('aws-lambda-multipart-parser')

const AWS = require('aws-sdk');
var s3 = new AWS.S3();

module.exports.index = (event, context, callback) => {
    let response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'text',
            'Access-Control-Allow-Origin': '*'
        },
        body: "<h4>NodeJs + Serverless Framework + API Gateway + Lambda + RDS (PostgreSQL)</h4> <br> \
                Get all users Method: Get, path: /users <br> \
                Get users count Method: Get, path: /users/count <br> \
                Get user by Id Method: Get, path: /users/{id} <br> \
            "
    }
    return callback(null, response);
};

module.exports.listUsers = (event, context, callback) => {
    knex.select().table('users').then(users => {
        return callback(null, successResponseBuilder(JSON.stringify(
            {
                "success": true,
                "payload": users
            }
        )));
    }).catch(err => {
        return callback(null, failureResponseBuilder(500, JSON.stringify(
            {
                "success": false,
                "message": "Something went wrong."
            }
        )));
    });
};

module.exports.getUsersCount = (event, context, callback) => {
    knex('users').count('*', {as: 'user_count'}).then(count => {
        return callback(null, successResponseBuilder(JSON.stringify(
            {
                "success": true,
                "payload": count
            }
        )));
     }).catch(err => {
        return callback(null, failureResponseBuilder(500, JSON.stringify(
            {
                "success": false,
                "message": "Something went wrong."
            }
        )));
    });
};

module.exports.getUserById = (event, context, callback) => {
    knex('users').where('id', '=', event.pathParameters.id).then(user => {
        if(user.length > 0){
            return callback(null, successResponseBuilder(JSON.stringify(
                {
                    "success": true,
                    "payload": user
                }
            )));
        }else{
            return callback(null, successResponseBuilder(JSON.stringify(
                {
                    "success": false,
                    "message": "No user found User Id:"+event.pathParameters.id
                }
            )));
        }
    }).catch(err => {
        return callback(null, failureResponseBuilder(500, JSON.stringify(
            {
                "success": false,
                "message": "Something went wrong."
            }
        )));
    });
};

module.exports.uploadUserProfileImg = (event, context, callback) => {
    
    let file = multipart.parse(event, true)
    let fileName = file.profile_img.filename;
    let params = {
        // Bucket: 'node-app-dev-app',
        Key: fileName,
        Body: file.profile_img.content,
        ContentType: 'image/jpeg'
    }

    s3.putObject(params, (err, data) => {
        if(err){
            return callback(null, failureResponseBuilder(500, JSON.stringify(
                {
                    "success": false,
                    "message": err
                }
            )));
        }

        return callback(null, successResponseBuilder(JSON.stringify(
            {
                "success": true,
                "message": "File-uploaded"
            }
        )));
    });
};

let successResponseBuilder = (body) => {
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: body
    };
};

let failureResponseBuilder = (statusCode, body) => {
    return {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: body
    };
};

