var crypto = require('crypto');
var s3 = require('s3');
var copy = require('copy-paste').copy;
var hashfile = require('./hashfile');

var config = require('../config/config.json');

var pushfile = exports;

pushfile.pf = function (filename) {
  hashfile.hash(filename, "wR2BCXqWhHC94kbgl6qNei99d", function(newFilename){

    var client = s3.createClient({
      key: config.awsKey,
      secret: config.awsSecret,
      bucket: config.s3Bucket
    });

    var uploader = client.upload(filename, newFilename, {});
    uploader.on('error', function(err){
        console.log('Unable to upload:', err.stack);
    })
    uploader.on('end', function(url){
      if(typeof config.url === 'undefined') {
        console.log('File is available at', url);
        copy(url);
      } else {
        var location = config.url + '/' + newFilename;
        console.log('File is available at', location);
        copy(location);
      }
    })
  });
}