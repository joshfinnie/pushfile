/*globals require, exports, console, process*/
var fs = require('fs');
var crypto = require('crypto');
var AWS = require('aws-sdk');
var copy = require('copy-paste').copy;
var prompt = require('prompt');
var mime = require('mime');
var hashfile = require('./hashfile');

var pushfile = exports;

pushfile.pf = function (filename, unique) {

  var s3Bucket;

  try {
    var config = require(process.env.HOME + '/.pushfile.json');
    AWS.config.update({accessKeyId: config.awsKey, secretAccessKey: config.awsSecret});
    s3Bucket = new AWS.S3({params: {Bucket: config.s3Bucket}});
  } catch (e) {
    console.log(e);
    console.log('Looks like your PushFile config file is missing.\nPlease run `pushfile --configuration` to set up.\n');
    process.exit(1);
  }

  'use strict';
  var salt;

  if (unique === true) {
    var buf = require('crypto').randomBytes(12);
    salt = buf.toString('hex');
  } else {
    salt = 'wR2BXqWhHC9b4kbgl6qNei9d';
  }

  hashfile.hash(filename, salt, function(newFilename){
    contentType = mime.lookup(filename);
    fs.readFile(filename, function(err, fileBuffer){
      var params = {
        Key: newFilename,
        ACL: 'public-read',
        Body: fileBuffer,
        ContentType: contentType
      }
      s3Bucket.putObject(params, function(err, success){
        if(err) {
          console.log('Unable to upload:', err.stack);
        } else {
          if(typeof config.url === 'undefined') {
            console.log('File is available at', url);
            copy(url);
            return;
          } else {
            var location = config.url + '/' + newFilename;
            console.log('File is available at', location);
            copy(location);
            return;
          }
        }
      });
    })
  });
};

pushfile.createConfig = function() {
  'use strict';
  prompt.start();

  var schema = {
    properties: {
      awsClientKey: {
        description: 'Enter your AWS Client Key',
        required: true
      },
      awsSecretKey: {
        description: 'Enter your AWS Secret Key',
        required: true
      },
      awsBucketName: {
        description: 'Enter the name of your AWS Bucket',
        required: true
      },
      customURL: {
        description: 'Enter your custom URL (not required)',
      }
    }
  };

  prompt.get(schema, function (err, result) {
    if (err) throw err;
    var configFile = {
      'awsKey': result.awsClientKey,
      'awsSecret': result.awsSecretKey,
      's3Bucket': result.awsBucketName
    };
    if( result.customURL ) {
      configFile.url = result.customURL;
    }
    fs.writeFile(process.env.HOME + '/.pushfile.json', JSON.stringify(configFile), function (err) {
      if (err) throw err;
      console.log('Configuration file was written.');
    });
  });
};
