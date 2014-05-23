/*globals require, exports, console, process*/
var fs = require('fs');
var crypto = require('crypto');
var s3 = require('s3');
var copy = require('copy-paste').copy;
var prompt = require('prompt');
var hashfile = require('./hashfile');

try {
  var config = require(process.env.HOME + '/.pushfile.json');
  var client = s3.createClient({ key: config.awsKey,
                               secret: config.awsSecret,
                               bucket: config.s3Bucket });
} catch (e) {
  console.log('Looks like your PushFile config file is missing.\nPlease run `pushfile --configuration` to set up.\n');
}

var pushfile = exports;

pushfile.pf = function (filename, unique) {
  'use strict';
  var salt;

  if (unique === true) {
    var buf = require('crypto').randomBytes(12);
    salt = buf.toString('hex');
  } else {
    salt = 'wR2BXqWhHC9b4kbgl6qNei9d';
  }

  hashfile.hash(filename, salt, function(newFilename){


    var uploader = client.upload(filename, newFilename, {"x-amz-acl":"public-read"});
    uploader.on('error', function(err){
      console.log('Unable to upload:', err.stack);
    });
    uploader.on('end', function(url){
      if(typeof config.url === 'undefined') {
        console.log('File is available at', url);
        copy(url);
      } else {
        var location = config.url + '/' + newFilename;
        console.log('File is available at', location);
        copy(location);
      }
    });
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
